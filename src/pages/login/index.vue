<script lang="ts" setup>
import { account } from 'src/plugins/appwrite';
import { AppwriteException, getUserById } from 'src/shared/api';
import { captureApiException } from 'src/shared/utils';
import { useUserStore } from 'stores/user';

const email = ref('');
const password = ref('');
const isPasswordVisible = ref(false);
const isPending = ref(false);
const userStore = useUserStore();
const router = useRouter();

const handleUserLogin = async () => {
  isPending.value = true;
  try {
    const { userId } = await account.createEmailPasswordSession(email.value, password.value);
    const user = await getUserById(userId);
    userStore.$patch({
      accountId: userId,
      avatarFileId: user.avatarFileId,
      name: user.name,
      surname: user.surname,
      dateOfBirth: user.dateOfBirth,
      email: user.email,
      phone: user.phone,
      cars: user.cars
    });

    await router.push({ path: '/search', replace: true });
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
        <h4 class="q-pa-md">Войдите используя эл.&nbsp;почту и пароль</h4>

        <q-form
          autofocus
          class="q-pa-md column gap-md"
          @submit="handleUserLogin"
        >
          <q-input
            v-model="email"
            outlined
            type="email"
            label="Email"
            :rules="['email']"
          />

          <q-input
            v-model="password"
            outlined
            label="Пароль"
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

          <q-btn
            unelevated
            type="submit"
            label="Войти"
            color="primary"
            :loading="isPending"
          />

          <p>
            Нет аккаунта?
            <router-link
              to="/register"
              class="text-primary"
            >Зарегистрироваться
            </router-link
            >
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
