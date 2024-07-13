<script setup lang='ts'>
import { useTripSettingsStore } from 'stores/trip-settings';
import { storeToRefs } from 'pinia';

const store = useTripSettingsStore();
const { date } = storeToRefs(store);

const emit = defineEmits(['pick']);
</script>

<template>
  <q-card-section class="q-px-none q-pt-none">
    <h4 class="q-mx-lg q-mb-lg">Когда вы едете?</h4>
    <q-date
      v-model="date"
      flat
      minimal
      class="full-width"
      :options="(date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return new Date(date) >= today;
      }"
      @update:model-value="emit('pick')"
    ></q-date>
  </q-card-section>
</template>
