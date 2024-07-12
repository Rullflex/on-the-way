<script setup lang="ts">
import { createCar } from 'src/shared/api';
import { ICar } from 'src/shared/types';
import { captureApiException } from 'src/shared/utils';
import { useUserStore } from 'src/stores/user';
import LogoutButton from 'pages/profile/ui/LogoutButton.vue';
import LinksSection from 'pages/profile/ui/LinksSection.vue';
import CarsSection from 'pages/profile/ui/CarsSection.vue';
import ProfileSection from 'pages/profile/ui/ProfileSection.vue';
import SectionSeparator from 'pages/profile/ui/SectionSeparator.vue';

const UpdateCar = defineAsyncComponent(() => import('src/features/UpdateCar/UpdateCar.vue'));

const $q = useQuasar();
const isDialogVisible = ref(false);
const userStore = useUserStore();

const handleAddedCar = async (payload: Omit<ICar, 'user'>) => {
  $q.loading.show();
  await createCar({ ...payload, user: userStore.accountId }).catch(captureApiException);
  $q.loading.hide();
  isDialogVisible.value = false;
};
</script>

<template>
  <q-page>
    <q-list class="q-px-sm q-py-md">
      <ProfileSection />

      <SectionSeparator />

      <CarsSection
        @add-car-btn-click="isDialogVisible = true"
      />

      <SectionSeparator />

      <LinksSection />

      <SectionSeparator />

      <LogoutButton />
    </q-list>
  </q-page>

  <q-dialog
    v-model="isDialogVisible"
    maximized
  >
    <UpdateCar @updated="handleAddedCar" />
  </q-dialog>
</template>
