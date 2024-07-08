<script setup lang="ts">
import { getPluralNoun } from 'src/shared/utils';
import { useTripSettingsStore } from 'stores/trip-settings';
import { TRAVEL_CONVENIENCES } from 'src/shared/constants';
import { MyItem } from 'src/shared/ui';
import { TravelConveniences } from 'src/shared/types/travelConveniencesTypes';

const store = useTripSettingsStore();
const { origin, destination, date, passengers } = storeToRefs(store);

const sortOptions = [{ label: 'По времени выезда' }, { label: 'По цене' }, { label: 'По кол-ву свободных мест' }];
const selectedSortOption = ref(null);

const travelConveniences = ref<TravelConveniences>({
  arePetsAllowed: false,
  hasBaggageTransportation: false,
  hasPackageDelivery: false,
  hasChildSeat: false,
  hasAirConditioner: false,
  isMaxTwoInTheBack: false,
});

const toggleConvenience = (name: keyof TravelConveniences) => {
  travelConveniences.value[name] = !travelConveniences.value[name];
};
const isDialogVisible = ref<boolean>(false);

const showDialog = () => {
  isDialogVisible.value = true;
};
</script>

<template>
  <q-header
    reveal
    bordered
    class="bg-white text-dark row q-pa-sm justify-between items-center"
  >
    <q-btn
      icon="eva-chevron-left-outline"
      flat
      dense
      to="/search"
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
      @click="showDialog"
    />
  </q-header>

  <q-dialog
    maximized
    v-model="isDialogVisible"
  >
    <q-card>
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
        <h6 class="q-mb-md">Сортировать</h6>

        <q-select
          outlined
          :options="sortOptions"
          v-model="selectedSortOption"
        />
      </q-card-section>

      <q-card-section class="q-px-lg">
        <h6>Удобства</h6>
      </q-card-section>

      <q-list class="q-px-sm">
        <my-item
          v-for="convenience in TRAVEL_CONVENIENCES"
          :key="convenience.name"
          :label="convenience.title"
          :icon="travelConveniences[convenience.name as keyof TravelConveniences] ? 'eva-checkmark-square-2-outline' : 'eva-square-outline'"
          clickable
          @click="toggleConvenience(convenience.name as keyof TravelConveniences)"
        >
          <template v-slot:append>
            <q-item-section side>
              <q-icon :name="convenience.icon" />
            </q-item-section>
          </template>
        </my-item>
      </q-list>
    </q-card>
  </q-dialog>
</template>
