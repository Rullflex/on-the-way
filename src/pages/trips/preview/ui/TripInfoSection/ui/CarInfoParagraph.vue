<script setup lang="ts">
import { ICar } from 'src/shared/types';

defineProps<{
  car: ICar;
}>();
</script>

<template>
  <q-item>
    <q-item-section side>
      <q-icon name="eva-car-outline" />
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ car.name }}</q-item-label>
      <q-item-label caption>
        {{ car.year }}, {{ car.color }}
        <q-chip
          v-if="car.licensePlate"
          dense
          :label="car.licensePlate"
        />
      </q-item-label>
    </q-item-section>
  </q-item>
</template>
