<script setup lang="ts">
import { MyItem } from 'src/shared/ui';
import { useUserStore } from 'stores/user';

const userStore = useUserStore();
const emit = defineEmits(['addCarBtnClick']);
</script>

<template>
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
    @click="emit('addCarBtnClick')"
  />
</template>
