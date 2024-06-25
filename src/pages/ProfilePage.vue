<script setup lang="ts">
import { computed, defineAsyncComponent, ref } from 'vue';
import { useCarInfoStore } from 'src/stores/car-info';
const AddVehcile = defineAsyncComponent(() => import('../features/AddVehicle/AddVehicle.vue'));

const carInfoStore = useCarInfoStore();
const cars = computed(() => carInfoStore.cars);

const extraLinks = ['Ваши отзывы', 'О проекте', 'Помощь', 'Оцените сервис', 'Пользовательское соглашение'];
const isDialogVisible = ref(false);
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
          <q-avatar
            color="grey-4"
            text-color="white"
            icon="eva-person"
            size="5rem"
          />
        </q-item-section>

        <q-item-section side>
          <q-icon name="eva-chevron-right-outline"></q-icon>
        </q-item-section>
      </q-item>

      <!-- ANCHOR - Edit Profile -->
      <q-item
        clickable
        class="rounded-borders text-primary"
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

      <!-- ANCHOR - Cars -->
      <q-item-label header>Машины</q-item-label>

      <template v-if="cars.length">
        <q-item
          v-for="car in cars"
          :key="car.licensePlate"
          clickable
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

      <q-separator class="q-my-md" />

      <!-- ANCHOR - Extra Links -->
      <q-item
        clickable
        v-for="link in extraLinks"
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
        class="rounded-borders"
      >
        <q-item-section class="text-negative">Выйти</q-item-section>
      </q-item>
    </q-list>
  </q-page>

  <q-dialog
    v-model="isDialogVisible"
    maximized
  >
    <AddVehcile @updated="isDialogVisible = false" />
  </q-dialog>
</template>
