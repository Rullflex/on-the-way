<script setup lang="ts">
import { deleteCar, getCarById, updateCar, Response } from 'src/shared/api';
import { ICar } from 'src/shared/types';
import { MyItem } from 'src/shared/ui';
import { captureApiException } from 'src/shared/utils';
const UpdateCar = defineAsyncComponent(() => import('src/features/UpdateCar/UpdateCar.vue'));

const props = defineProps<{ id: string }>();

const $q = useQuasar();
const router = useRouter();

const isDialogVisible = ref(false);
const carResponse = ref<Response<ICar>>();

const carItems = computed(() => {
  const { licensePlate, name, year, bodyType, color } = carResponse.value || {};

  return [
    { label: 'Регистрационный номер', value: licensePlate },
    { label: 'Марка', value: name },
    { label: 'Год выпуска', value: typeof year === 'number' && String(year) },
    { label: 'Тип кузова', value: bodyType },
    { label: 'Цвет', value: color },
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

const handleUpdateCar = async (payload: Omit<ICar, 'user'>) => {
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
  <q-page padding>
    <h5 class="q-mb-lg q-px-md">Информация о машине</h5>

    <q-list>
      <my-item
        v-for="item in carItems"
        :key="item.label"
        :label="item.label"
        :caption="item.value || '-'"
      />

      <q-separator
        inset
        spaced="1rem"
      />

      <my-item
        clickable
        color="primary"
        label="Изменить данные"
        @click="isDialogVisible = true"
      />

      <my-item
        clickable
        color="primary"
        label="Удалить авто"
        @click="handleDeleteCard"
      />
    </q-list>
  </q-page>

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
  layout: subPage
</route>
