<script setup lang="ts">
import { createCar } from 'src/shared/api';
import { ICar } from 'src/shared/types';
import { captureApiException } from 'src/shared/utils';
import { MyItem } from 'src/shared/ui';
import StepContainer from 'pages/publish/ui/StepContainer.vue';
import { useUserStore } from 'stores/user';
import { AppwriteException } from 'appwrite';

const carId = defineModel({ default: '' });

const $q = useQuasar();
const userStore = useUserStore();
const cars = computed(() => userStore.cars);
const isDialogVisible = ref(false);
const UpdateCar = defineAsyncComponent(() => import('src/features/UpdateCar/UpdateCar.vue'));

const handleAddedCar = async (payload: Omit<ICar, 'user'>) => {
  $q.loading.show();
  try {
    const response = await createCar({ ...payload, user: userStore.accountId });
    userStore.addCar(response);
    carId.value = response.$id;
  } catch (err) {
    captureApiException(err as AppwriteException);
  } finally {
    $q.loading.hide();
    isDialogVisible.value = false;
  }
};
</script>

<template>
  <StepContainer>
    <h4 class="q-ma-lg">Выберите автомобиль для поездки</h4>
    <div
      v-if="cars.length"
      class="q-mx-sm"
    >
      <q-item
        v-for="car in cars"
        :key="car.$id"
        clickable
        :active="carId === car.$id"
        @click="carId = car.$id"
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
    </div>

    <my-item
      v-else
      clickable
      color="primary"
      label="Добавить авто"
      icon="eva-plus-circle-outline"
      @click="isDialogVisible = true"
    />

    <q-dialog
      v-model="isDialogVisible"
      maximized
    >
      <UpdateCar @updated="handleAddedCar" />
    </q-dialog>
  </StepContainer>
</template>
