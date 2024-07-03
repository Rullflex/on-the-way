<script setup lang="ts">
import { CarInfo, useCarInfoStore } from 'src/stores/car-info';
import { MyAvatar, MyItem } from 'src/shared/ui';

const UpdateCar = defineAsyncComponent(() => import('src/features/UpdateCar/UpdateCar.vue'));

const carInfoStore = useCarInfoStore();
const cars = computed(() => carInfoStore.cars);

const isDialogVisible = ref(false);

const handleAddedCar = (payload: Omit<CarInfo, 'id'>) => {
  carInfoStore.addCar({
    id: Date.now(),
    ...payload,
  });
  isDialogVisible.value = false;
};
</script>

<template>
  <q-page>
    <q-list class="q-px-sm q-py-md">
      <!-- ANCHOR - Personal Data -->
      <q-item
        class="rounded-borders"
        to="/profile/preview/1"
      >
        <q-item-section>
          <q-item-label class="text-h5 text-blue-grey-9">Дмитрий</q-item-label>
          <q-item-label caption>Личные данные</q-item-label>
        </q-item-section>

        <q-item-section avatar>
          <my-avatar
            self
            size="5rem"
          />
        </q-item-section>

        <q-item-section side>
          <q-icon name="eva-chevron-right-outline"></q-icon>
        </q-item-section>
      </q-item>

      <!-- ANCHOR - Edit Profile -->
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

      <!-- SECTION - Cars -->
      <q-item-label header>Машины</q-item-label>

      <!-- ANCHOR - Список машин -->
      <template v-if="cars.length">
        <q-item
          v-for="car in cars"
          :key="car.licensePlate"
          clickable
          :to="`/cars/preview/${car.id}`"
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

      <!-- ANCHOR - Add Car -->
      <my-item
        clickable
        color="primary"
        label="Добавить авто"
        icon="eva-plus-circle-outline"
        @click="isDialogVisible = true"
      />
      <!-- !SECTION -->

      <q-separator
        inset
        spaced="1rem"
      />

      <!-- ANCHOR - Extra Links -->
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

      <!-- ANCHOR - Log Out -->
      <my-item
        clickable
        color="negative"
        label="Выйти"
      />
    </q-list>
  </q-page>

  <!-- ANCHOR - Add Car Dialog -->
  <q-dialog
    v-model="isDialogVisible"
    maximized
  >
    <UpdateCar @updated="handleAddedCar" />
  </q-dialog>
</template>
