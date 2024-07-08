<script setup lang="ts">
import { useTripsStore } from 'stores/trips';
import PageHeader from './ui/PageHeader.vue';

const tripsStore = useTripsStore();
</script>

<template>
  <q-layout>
    <PageHeader />

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
    </q-page-container>
  </q-layout>
</template>

<route lang="yaml">
meta:
  layout: blank
</route>
