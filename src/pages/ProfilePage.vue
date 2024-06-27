<script setup lang="ts">
import { computed, defineAsyncComponent, ref } from 'vue';
import { CarInfo, useCarInfoStore } from 'src/stores/car-info';
import { MyAvatar } from 'src/shared/ui';
const UpdateCar = defineAsyncComponent(() => import('../features/UpdateCar/UpdateCar.vue'));

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
  <q-page class="q-pa-lg">
    <q-list>
      <!-- ANCHOR - Personal Data -->
      <q-item
        clickable
        class="rounded-borders"
      >
        <q-item-section>
          <q-item-label class="text-h5 text-bold text-blue-grey-9">Дмитрий</q-item-label>
          <q-item-label caption>Личные данные</q-item-label>
        </q-item-section>

        <q-item-section avatar>
          <my-avatar />
        </q-item-section>

        <q-item-section side>
          <q-icon name="eva-chevron-right-outline"></q-icon>
        </q-item-section>
      </q-item>

      <!-- ANCHOR - Edit Profile -->
      <q-item
        clickable
        class="rounded-borders text-primary"
        :to="{ name: 'profile-edit' }"
      >
        <q-item-section side>
          <q-icon
            color="primary"
            name="eva-edit-outline"
          ></q-icon>
        </q-item-section>
        <q-item-section>Редактировать профиль</q-item-section>
      </q-item>

      <q-separator class="q-my-md" />

      <!-- SECTION - Cars -->
      <q-item-label header>Машины</q-item-label>

      <!-- ANCHOR - Cars -->
      <template v-if="cars.length">
        <q-item
          v-for="car in cars"
          :key="car.licensePlate"
          clickable
          :to="{ name: 'car-info', params: { id: car.id } }"
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
      <q-item
        clickable
        class="rounded-borders text-primary"
        @click="isDialogVisible = true"
      >
        <q-item-section side>
          <q-icon
            color="primary"
            name="eva-plus-circle-outline"
          ></q-icon>
        </q-item-section>
        <q-item-section>Добавить авто</q-item-section>
      </q-item>
      <!-- !SECTION -->

      <q-separator class="q-my-md" />

      <!-- ANCHOR - Extra Links -->
      <q-item
        clickable
        v-for="link in ['Ваши отзывы', 'О проекте', 'Помощь', 'Оцените сервис', 'Пользовательское соглашение']"
        :key="link"
        class="rounded-borders"
      >
        <q-item-section>{{ link }}</q-item-section>
        <q-item-section side>
          <q-icon name="eva-chevron-right-outline"></q-icon>
        </q-item-section>
      </q-item>

      <q-separator class="q-my-md" />

      <!-- ANCHOR - Log Out -->
      <q-item
        clickable
        class="rounded-borders text-negative"
      >
        <q-item-section>Выйти</q-item-section>
      </q-item>
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
