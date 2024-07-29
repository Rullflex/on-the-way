<script setup lang="ts">
import { useTripSettingsStore } from 'stores/trip-settings';

const store = useTripSettingsStore();

const passengers = ref(store.passengers);

const emit = defineEmits<{
  (event: 'pick', passengers: number): void;
}>();
</script>

<template>
  <q-card-section class="q-px-lg q-pt-none col column justify-between">
    <h4>Количество бронируемых мест</h4>
    <div
      class="column items-center gap-lg"
      style="flex: 1; justify-content: center"
    >
      <div class="row items-center">
        <q-btn
          flat
          dense
          icon="eva-minus-circle-outline"
          @click="passengers > 1 && passengers--"
        />
        <div
          class="text-h1 text-bold q-px-md row flex-center"
          style="width: 100px"
        >
          {{ passengers }}
        </div>
        <q-btn
          flat
          dense
          icon="eva-plus-circle-outline"
          @click="passengers++"
        />
      </div>
    </div>
    <q-btn
      unelevated
      color="primary"
      label="Подтвердить"
      @click="emit('pick', passengers)"
      class="full-width q-fixed-bottom q-mb-sm"
    />
  </q-card-section>
</template>
