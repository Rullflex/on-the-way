<script setup lang="ts">
import { TRIP_CONVENIENCES } from 'src/shared/constants';
import { MyItem } from 'src/shared/ui';
import { TripConveniencesNames } from 'src/shared/enums';

const open = defineModel<boolean>({ default: false });

const emit = defineEmits<{
  (e: 'apply-filters', tripConveniences: TripConveniencesNames[]): void;
}>();

const tripConveniences = ref<Set<TripConveniencesNames>>(new Set());

const toggleConvenience = (name: TripConveniencesNames) => {
  if (tripConveniences.value.has(name)) {
    tripConveniences.value.delete(name);
  } else {
    tripConveniences.value.add(name);
  }
};
</script>

<template>
  <q-dialog
    maximized
    v-model="open"
  >
    <q-card class="column no-wrap">
      <q-card-section class="sticky-top bg-white z-top">
        <q-btn
          v-close-popup
          icon="eva-close"
          flat
          dense
        />
      </q-card-section>

      <q-card-section class="q-px-lg q-pt-none">
        <h4>Фильтровать</h4>
      </q-card-section>

      <q-card-section class="q-px-lg">
        <h6>Удобства</h6>
      </q-card-section>

      <q-list class="q-px-sm">
        <my-item
          v-for="convenience in TRIP_CONVENIENCES"
          :key="convenience.name"
          :label="convenience.title"
          :icon="tripConveniences.has(convenience.name) ? 'eva-checkmark-square-2-outline' : 'eva-square-outline'"
          clickable
          @click="toggleConvenience(convenience.name)"
        >
          <template v-slot:append>
            <q-item-section side>
              <q-icon :name="convenience.icon" />
            </q-item-section>
          </template>
        </my-item>
      </q-list>

      <q-card-section class="q-px-lg sticky-bottom bg-white q-mt-auto">
        <q-btn
          v-close-popup
          unelevated
          color="primary"
          label="Применить"
          class="full-width"
          @click="emit('apply-filters', Array.from(tripConveniences))"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
