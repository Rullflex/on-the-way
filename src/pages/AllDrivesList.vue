<script setup lang="ts">
import { useDriveSettingsStore } from 'src/stores/drive-settings';
import { storeToRefs } from 'pinia';

const store = useDriveSettingsStore();
const { origin, destination, date, passengers } = storeToRefs(store);

const list = ['item 1', 'item 2', 'item 3', 'item 4', 'item 5', 'item 6', 'item 7', 'item 8', 'item 9', 'item 10'];

const getPluralNoun = (n: number, one: string, two: string, five: string) => {
  n = Math.abs(n) % 100;
  const nMod10 = n % 10;
  const nMod100 = n % 100;
  if (nMod10 === 1 && nMod100 !== 11) {
    return one;
  }
  if (nMod10 >= 2 && nMod10 <= 4 && (nMod100 < 10 || nMod100 >= 20)) {
    return two;
  }
  return five;
};
</script>

<template>
  <q-layout>
    <!-- SECTION - Header -->
    <q-header
      reveal
      bordered
      class="bg-white text-dark row q-pa-sm justify-between items-center"
    >
      <q-btn
        icon="eva-chevron-left-outline"
        flat
        dense
        :to="{ name: 'search' }"
      />

      <div style="font-size: 0.75rem">
        <div class="row flex-center gap-xs">
          <span>{{ origin }}</span>
          <q-icon name="eva-arrow-forward-outline" />
          <span>{{ destination }}</span>
        </div>

        <div class="text-grey-8 text-center">
          {{ date }}, {{ passengers }} {{ getPluralNoun(passengers, 'пассажир', 'пассажира', 'пассажиров') }}
        </div>
      </div>

      <q-btn
        icon="eva-options-2-outline"
        flat
        dense
      />
    </q-header>
    <!-- !SECTION -->

    <q-page-container>
      <q-page class="bg-secondary">
        <div class="column gap-sm q-pa-lg full-height">
          <q-card
            v-for="item in list"
            :key="item"
          >
            <q-card-section>
              {{ item }}
            </q-card-section>
          </q-card>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
