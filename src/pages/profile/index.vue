<script setup lang="ts">
import { MyAvatar, MyItem } from 'src/shared/ui';
import { createCar } from 'src/shared/api';
import { ICar } from 'src/shared/types';
import { captureApiException } from 'src/shared/utils';
import { useUserStore } from 'src/stores/user';
import { account } from 'src/plugins/appwrite';

const UpdateCar = defineAsyncComponent(() => import('src/features/UpdateCar/UpdateCar.vue'));

const $q = useQuasar();
const router = useRouter();
const isDialogVisible = ref(false);
const userStore = useUserStore();

const handleAddedCar = async (payload: ICar) => {
  $q.loading.show();
  await createCar(payload).catch(captureApiException);
  $q.loading.hide();
  isDialogVisible.value = false;
};

const logout = async () => {
  account.deleteSession('current');
  userStore.$reset();
  router.push('/login');
};
</script>

<template>
  <q-page>
    <q-list class="q-px-sm q-py-md">
      <q-item
        class="rounded-borders"
        :to="`/profile/preview/${userStore.accountId}`"
      >
        <q-item-section>
          <q-item-label class="text-h5 text-blue-grey-9">{{ userStore.name }}</q-item-label>
          <q-item-label caption>Личные данные</q-item-label>
        </q-item-section>

        <q-item-section avatar>
          <my-avatar size="5rem" />
        </q-item-section>

        <q-item-section side>
          <q-icon name="eva-chevron-right-outline"></q-icon>
        </q-item-section>
      </q-item>

      <my-item
        color="primary"
        to="/profile/edit"
        icon="eva-edit-outline"
        label="Редактировать профиль"
      />

      <q-separator
        inset
        spaced="1rem"
      />

      <q-item-label header>Машины</q-item-label>

      <template v-if="userStore.cars.length">
        <q-item
          v-for="car in userStore.cars"
          :key="car.licensePlate"
          clickable
          :to="`/cars/preview/${car.$id}`"
          class="rounded-borders"
        >
          <q-item-section>
            <q-item-label class="text-bold">
              {{ car.name }}
            </q-item-label>

            <q-item-label caption>
              {{ car.color }}
            </q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-icon name="eva-chevron-right-outline" />
          </q-item-section>
        </q-item>
      </template>

      <my-item
        clickable
        color="primary"
        label="Добавить авто"
        icon="eva-plus-circle-outline"
        @click="isDialogVisible = true"
      />

      <q-separator
        inset
        spaced="1rem"
      />

      <my-item
        v-for="link in ['Ваши отзывы', 'О проекте', 'Помощь', 'Оцените сервис', 'Пользовательское соглашение']"
        :key="link"
        :label="link"
        clickable
        chevron
      />

      <q-separator
        inset
        spaced="1rem"
      />

      <my-item
        clickable
        color="negative"
        label="Выйти"
        @click="logout"
      />
    </q-list>
  </q-page>

  <q-dialog
    v-model="isDialogVisible"
    maximized
  >
    <UpdateCar @updated="handleAddedCar" />
  </q-dialog>
</template>
