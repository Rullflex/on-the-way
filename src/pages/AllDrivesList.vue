<script setup lang="ts">
import { useDriveSettingsStore } from 'src/stores/drive-settings';
import { storeToRefs } from 'pinia';
import { getPluralNoun } from 'src/shared/utils';

const store = useDriveSettingsStore();
const { origin, destination, date, passengers } = storeToRefs(store);

const drivesList = [
  {
    id: 1,
    price: '900',
    origin: {
      place: 'Пермь',
      time: '10:00',
    },
    destination: {
      place: 'Кудымкар',
      time: '13:00',
    },
    reserved: 1,
    passengers: 4,
    driver: {
      name: 'Алексей',
      car: 'TOYOTA COROLA XXL 22',
      avatar: 'https://cdn.quasar.dev/img/avatar4.jpg',
    },
  },
  {
    id: 2,
    price: '800',
    origin: {
      place: 'Юсьва',
      time: '11:00',
    },
    destination: {
      place: 'Карагай',
      time: '13:30',
    },
    reserved: 2,
    passengers: 3,
    driver: {
      name: 'Алина',
      car: 'ВАЗ 1122',
      avatar: 'https://cdn.quasar.dev/img/avatar3.jpg',
    },
  },
  {
    id: 3,
    price: '1000',
    origin: {
      place: 'Юрла',
      time: '14:00',
    },
    destination: {
      place: 'Ленинск',
      time: '15:00',
    },
    reserved: 6,
    passengers: 7,
    driver: {
      name: 'Мария',
      car: 'Jerry Tiger 2020',
      avatar: 'https://cdn.quasar.dev/img/avatar2.jpg',
    },
  },
];
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
      <q-page class="q-pa-lg">
        <div class="text-h5 text-bold q-mb-sm">Сегодня</div>

        <q-list class="column gap-sm">
          <q-item
            v-for="drive in drivesList"
            :key="drive.id"
            clickable
            class="row rounded-borders bg-white shadow-2 q-pa-md"
          >
            <div
              class="column overflow-hidden"
              style="width: 72px"
            >
              <span class="text-subtitle2">{{ drive.origin.place }}</span>
              <span class="text-caption">{{ drive.origin.time }}</span>

              <q-icon
                name="eva-more-vertical-outline"
                class="q-my-sm"
              />

              <span class="text-subtitle2">{{ drive.destination.place }}</span>
              <span class="text-caption">{{ drive.destination.time }}</span>
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
                  <img :src="drive.driver.avatar" />
                </q-avatar>

                <div class="col-auto column items-end">
                  <span class="text-bold">{{ drive.price }} ₽</span>
                  <div class="row items-center gap-xs text-caption">
                    <span>{{ drive.reserved }}/{{ drive.passengers }}</span>
                    <q-icon name="eva-people-outline" />
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="column">
                  <span class="text-subtitle2">{{ drive.driver.name }}</span>
                  <span class="text-caption">{{ drive.driver.car }}</span>
                </div>
              </div>

              <div class="row q-mt-auto gap-sm justify-end">
                <q-icon
                  v-for="name in ['cube', 'briefcase', 'pin']"
                  :key="name"
                  :name="`eva-${name}-outline`"
                  size="1.2rem"
                  v-tooltip="'asd'"
                />
              </div>
            </div>
          </q-item>
        </q-list>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
