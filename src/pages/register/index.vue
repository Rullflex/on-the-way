<script lang="ts" setup>
import { AppwriteException, ID } from 'appwrite';
import { account } from 'src/plugins/appwrite';
import { createUser } from 'src/shared/api';
import { captureApiException } from 'src/shared/utils';
import { useUserStore } from 'src/stores/user';

defineOptions({
  name: 'RegisterPage',
});

const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const isPasswordVisible = ref(false);
const isPending = ref(false);
const userStore = useUserStore();
const router = useRouter();
const route = useRoute();

const handleUserRegister = async () => {
  isPending.value = true;
  try {
    const accountResponse = await account.create(ID.unique(), email.value, password.value, name.value);
    const createSession = () => account.createEmailPasswordSession(email.value, password.value);
    const addUser = () => createUser({ name: name.value, email: email.value }, accountResponse.$id);
    await Promise.all([createSession(), addUser()]);

    userStore.$patch({
      accountId: accountResponse.$id,
      name: name.value,
      email: email.value,
    });

    router.push({ path: route.redirectedFrom?.path ?? '/', replace: true });
  } catch (error) {
    captureApiException(error as AppwriteException);
  } finally {
    isPending.value = false;
  }
};
</script>

<template>
  <q-layout>
    <q-page-container>
      <q-page padding>
        <h4 class="q-pa-md">Пройдите регистрацию используя вашу эл.почту</h4>

        <q-form
          autofocus
          class="q-pa-md column gap-md"
          @submit="handleUserRegister"
        >
          <q-input
            v-model.trim="name"
            outlined
            hide-bottom-space
            label="Введите Ваше имя"
            :rules="[(val) => val && !val.includes(' ')]"
          />

          <q-input
            v-model.trim="email"
            outlined
            hide-bottom-space
            type="email"
            label="Введите эл. почту"
            :rules="['email']"
          />

          <q-input
            v-model="password"
            outlined
            hide-bottom-space
            label="Введите пароль"
            :rules="[(val) => val && val.length >= 8]"
            :type="isPasswordVisible ? 'text' : 'password'"
          >
            <template v-slot:append>
              <q-icon
                class="cursor-pointer"
                :name="isPasswordVisible ? 'eva-eye-outline' : 'eva-eye-off-outline'"
                @click="isPasswordVisible = !isPasswordVisible"
              />
            </template>
          </q-input>

          <q-input
            v-model="confirmPassword"
            outlined
            label="Подтвердите пароль"
            :rules="[(val) => val === password || 'Пароли не совпадают']"
            :type="isPasswordVisible ? 'text' : 'password'"
          >
            <template v-slot:append>
              <q-icon
                class="cursor-pointer"
                :name="isPasswordVisible ? 'eva-eye-outline' : 'eva-eye-off-outline'"
                @click="isPasswordVisible = !isPasswordVisible"
              />
            </template>
          </q-input>

          <q-btn
            unelevated
            type="submit"
            label="Зарегистрироваться"
            color="primary"
            :loading="isPending"
          />

          <p>
            Уже есть аккаунт?
            <router-link
              replace
              to="/login"
              class="text-primary"
            >
              Авторизоваться
            </router-link>
          </p>
        </q-form>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<route lang="yaml">
meta:
  layout: blank
</route>
