<script setup lang="ts">
import { useTripSettingsStore } from 'stores/trip-settings';
import { useTripsStore } from 'stores/trips';
import { getPluralNoun } from 'src/shared/utils';
import { TravelConveniences } from 'src/shared/types/travelConveniencesTypes';
import { TRAVEL_CONVENIENCES } from 'src/shared/constants';
import { MyItem } from 'src/shared/ui';

const store = useTripSettingsStore();
const { origin, destination, date, passengers } = storeToRefs(store);

const tripsStore = useTripsStore();

const isDialogVisible = ref<boolean>(false);
const showDialog = () => {
  isDialogVisible.value = true;
};

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
        @click="showDialog()"
      />
    </q-header>
    <!-- !SECTION -->

    <q-page-container>
      <q-page class="q-pa-lg">
        <h5 class="q-mb-sm">Сегодня</h5>

        <q-list class="column gap-sm">
          <q-item
            v-for="trip in tripsStore.trips"
            :key="trip.id"
            clickable
            :disable="trip.reserved === trip.passengers"
            class="row rounded-borders bg-white shadow-2 q-pa-md"
            :to="`/trips/preview/${trip.id}`"
          >
            <div
              class="column overflow-hidden"
              style="width: 72px"
            >
              <span class="text-subtitle2">{{ trip.origin.place }}</span>
              <span class="text-caption">{{ trip.origin.time }}</span>

              <q-icon
                name="eva-more-vertical-outline"
                class="q-my-sm"
              />

              <span class="text-subtitle2">{{ trip.destination.place }}</span>
              <span class="text-caption">{{ trip.destination.time }}</span>
            </div>

            <q-separator
              vertical
              spaced
              inset
            />

            <div class="col column gap-sm">
              <div class="row justify-between">
                <q-avatar
                  color="grey-4"
                  text-color="white"
                  size="2.5rem"
                >
                  <img :src="trip.driver.avatar" />
                </q-avatar>

                <div class="col-auto column items-end">
                  <span class="text-bold">{{
                    trip.reserved === trip.passengers ? 'Мест нет' : trip.price + ' ₽'
                  }}</span>
                  <div class="row items-center gap-xs text-caption">
                    <span>{{ trip.reserved }}/{{ trip.passengers }}</span>
                    <q-icon name="eva-people-outline" />
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="column">
                  <span class="text-subtitle2">{{ trip.driver.name }}</span>
                  <span class="text-caption">{{ trip.driver.car }}</span>
                </div>
              </div>

              <div class="row q-mt-auto gap-sm justify-end">
                <q-icon
                  v-for="icon in [
                    { name: 'cube', type: 'eva' },
                    { name: 'briefcase', type: 'eva' },
                    { name: 'air', type: 'material' },
                    { name: 'child_care', type: 'material' },
                    { name: 'pets', type: 'material' },
                    { name: 'social_distance', type: 'material' },
                  ]"
                  :key="icon.name"
                  :name="icon.type === 'eva' ? `eva-${icon.name}-outline` : icon.name"
                  size="1.2rem"
                />
              </div>
            </div>
          </q-item>
        </q-list>
      </q-page>

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
    </q-page-container>
  </q-layout>
</template>

<route lang="yaml">
meta:
  layout: blank
</route>
