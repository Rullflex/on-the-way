<script setup lang="ts">
import { deleteCar, updateCar } from 'src/shared/api';
import { ICar } from 'src/shared/types';
import { MyItem } from 'src/shared/ui';
import { captureApiException } from 'src/shared/utils';
import { useUserStore } from 'stores/user';
import { AppwriteException } from 'appwrite';

const UpdateCar = defineAsyncComponent(() => import('src/features/UpdateCar/UpdateCar.vue'));

const props = defineProps<{ id: string }>();

const $q = useQuasar();
const router = useRouter();
const userStore = useUserStore();

const isDialogVisible = ref(false);
const carItems = computed(() => {
  const { licensePlate, name, year, bodyType, color } = { ...userStore.cars.find((car) => car.$id === props.id) };

  return [
    { label: 'Регистрационный номер', value: licensePlate },
    { label: 'Марка', value: name },
    { label: 'Год выпуска', value: year?.toString() },
    { label: 'Тип кузова', value: bodyType },
    { label: 'Цвет', value: color },
  ];
});

const handleDeleteCard = () => {
  $q.dialog({
    title: 'Подтвердите действие',
    message:
      'Вы уверены, что хотите удалить данные о машине? Пассажиры больше не смогут увидеть эту информацию, если она была использована в предыдущих поездках!',
    persistent: true,
    cancel: true,
  }).onOk(async () => {
    $q.loading.show();
    try {
      await deleteCar(props.id);
      userStore.deleteCar(props.id);
    } catch (err) {
      captureApiException(err as AppwriteException);
    } finally {
      $q.loading.hide();
      router.back();
    }
  });
};

const handleUpdateCar = async (payload: Omit<ICar, 'user'>) => {
  $q.loading.show();
  try {
    await updateCar(props.id, payload);
    userStore.updateCar(props.id, payload);
  } catch (err) {
    captureApiException(err as AppwriteException);
  } finally {
    $q.loading.hide();
    isDialogVisible.value = false;
  }
};
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
