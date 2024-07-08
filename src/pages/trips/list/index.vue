<script setup lang="ts">
import { captureApiException } from 'src/shared/utils';
import { Loading, date as QDate } from 'quasar';
import { getAllTrips, getAvatarURL, ITrip, Response } from 'src/shared/api';
import PageHeader from './ui/PageHeader.vue';
import { MyAvatar } from 'src/shared/ui';

const trips = ref<Response<ITrip>[]>([]);

Loading.show();
getAllTrips()
  .then((response) => (trips.value = response.documents))
  .catch(captureApiException)
  .finally(Loading.hide);
</script>

<template>
  <q-layout>
    <PageHeader />

    <q-page-container>
      <q-page class="q-pa-lg">
        <h5 class="q-mb-sm">Сегодня</h5>

        <q-list class="column gap-sm">
          <q-item
            v-for="trip in trips"
            :key="trip.$id"
            clickable
            :disable="trip.alreadyReserved === trip.totalPassengers"
            class="row rounded-borders bg-white shadow-2 q-pa-md"
            :to="`/trips/preview/${trip.$id}`"
          >
            <div
              class="column overflow-hidden"
              style="width: 72px"
            >
              <span class="text-subtitle2">{{ trip.departureCity }}</span>
              <span class="text-caption">{{ QDate.formatDate(trip.departureTime, 'HH:mm') }}</span>

              <q-icon
                name="eva-more-vertical-outline"
                class="q-my-sm"
              />

              <span class="text-subtitle2">{{ trip.arrivalCity }}</span>
              <span class="text-caption">{{ QDate.formatDate(trip.arrivalTime, 'HH:mm') }}</span>
            </div>

            <q-separator
              vertical
              spaced
              inset
            />

            <div class="col column gap-sm">
              <div class="row justify-between">
                <my-avatar :src="trip.driver.avatarFileId ? getAvatarURL(trip.driver.avatarFileId) : ''" />

                <div class="col-auto column items-end">
                  <span class="text-bold">{{
                    trip.alreadyReserved === trip.totalPassengers ? 'Мест нет' : trip.price + ' ₽'
                  }}</span>
                  <div class="row items-center gap-xs text-caption">
                    <span>{{ trip.alreadyReserved }}/{{ trip.totalPassengers }}</span>
                    <q-icon name="eva-people-outline" />
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="column">
                  <span class="text-subtitle2">{{ trip.driver.name }}</span>
                  <span class="text-caption">{{ trip.driver.cars[0]?.name }}</span>
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
