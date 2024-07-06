<script setup lang="ts">
import { deleteCar, getCarById, updateCar, ICar, Response } from 'src/shared/api';
import { captureApiException } from 'src/shared/utils';
const UpdateCar = defineAsyncComponent(() => import('src/features/UpdateCar/UpdateCar.vue'));

const props = defineProps<{ id: string }>();

const $q = useQuasar();
const router = useRouter();

const isDialogVisible = ref(false);
const carResponse = ref<Response<ICar>>();

const listItems = computed(() => {
  const { licensePlate, name, year, bodyType, color } = carResponse.value || {};

  return [
    { label: 'Регистрационный номер', value: licensePlate || '-' },
    { label: 'Марка', value: name || '-' },
    { label: 'Год выпуска', value: year || '-' },
    { label: 'Тип кузова', value: bodyType || '-' },
    { label: 'Цвет', value: color || '-' },
  ];
});

const handleDeleteCard = () => {
  $q.dialog({
    title: 'Подтвердите действие',
    message: 'Вы уверены, что хотите удалить данные о машине?',
    persistent: true,
    cancel: true,
  }).onOk(async () => {
    $q.loading.show();
    await deleteCar(props.id).catch(captureApiException);
    $q.loading.hide();
    router.back();
  });
};

const handleUpdateCar = async (payload: ICar) => {
  $q.loading.show();
  await updateCar(props.id, payload).catch(captureApiException);
  $q.loading.hide();

  isDialogVisible.value = false;
};

onMounted(async () => {
  $q.loading.show();
  await getCarById(props.id)
    .then((response) => (carResponse.value = response))
    .catch(captureApiException);
  $q.loading.hide();
});
</script>

<template>
  <q-layout>
    <q-page-container>
      <q-page class="q-pa-lg">
        <q-btn
          @click="$router.back()"
          icon="eva-arrow-back-outline"
          flat
          dense
        />

        <h5 class="q-mb-lg q-mt-md">Информация о машине</h5>

        <q-list>
          <!-- ANCHOR - Car Info -->
          <q-item
            v-for="item in listItems"
            :key="item.label"
          >
            <q-item-section>
              <q-item-label>{{ item.label }}</q-item-label>
              <q-item-label caption>{{ item.value }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator class="q-my-md" />

          <!-- ANCHOR - Edit Car -->
          <q-item
            clickable
            class="rounded-borders text-primary"
            @click="isDialogVisible = true"
          >
            <q-item-section>
              <q-item-label>Изменить данные</q-item-label>
            </q-item-section>
          </q-item>

          <!-- ANCHOR - Delete Car -->
          <q-item
            clickable
            class="rounded-borders text-primary"
            @click="handleDeleteCard"
          >
            <q-item-section>
              <q-item-label>Удалить авто</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-page>
    </q-page-container>
  </q-layout>

  <!-- ANCHOR - Update Car Dialog -->
  <q-dialog
    v-model="isDialogVisible"
    maximized
  >
    <UpdateCar
      :id="props.id"
      @updated="handleUpdateCar"
    />
  </q-dialog>
</template>

<route lang="yaml">
meta:
  layout: blank
</route>
