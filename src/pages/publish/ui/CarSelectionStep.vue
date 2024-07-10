<script setup lang="ts">
import { Response } from 'src/plugins/appwrite/types';
import { createCar } from 'src/shared/api';
import { ICar } from 'src/shared/types';
import { captureApiException } from 'src/shared/utils';
import { MyItem } from 'src/shared/ui';
import StepContainer from 'pages/publish/ui/StepContainer.vue';
import { useUserInfoStore } from 'stores/user-info';

defineProps<{
  selectedCar: ICar | null
}>();

const $q = useQuasar();
const userStore = useUserInfoStore();
const cars = ref<Response<ICar>[]>(userStore.cars);
const isDialogVisible = ref(false);
const UpdateCar = defineAsyncComponent(() => import('src/features/UpdateCar/UpdateCar.vue'));

const emit = defineEmits(['carSelect']);

const handleAddedCar = async (payload: ICar) => {
  $q.loading.show();
  await createCar(payload).catch(captureApiException);
  $q.loading.hide();
  isDialogVisible.value = false;
  emit('carSelect', payload);
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
        :key="car.licensePlate"
        clickable
        :active="selectedCar && selectedCar.licensePlate === car.licensePlate"
        @click="$emit('carSelect', car)"
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
