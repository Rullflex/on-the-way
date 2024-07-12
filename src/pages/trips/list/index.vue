<script setup lang="ts">
import { captureApiException } from 'src/shared/utils';
import { getAllTrips, Response } from 'src/shared/api';
import { ITrip } from 'src/shared/types';
import PageHeader from './ui/PageHeader.vue';
import TripPreviewCard from 'src/features/TripPreviewCard.vue';

const isLoading = ref<boolean>(true);
const trips = ref<Response<ITrip>[]>([]);

getAllTrips()
  .then((response) => (trips.value = response.documents))
  .catch(captureApiException)
  .finally(() => (isLoading.value = false));
</script>

<template>
  <q-layout>
    <PageHeader />

    <q-page-container>
      <q-page class="q-pa-lg">
        <h5 class="q-mb-sm">Сегодня</h5>

        <q-list class="column gap-sm">
          <template v-if="isLoading">
            <q-skeleton
              v-for="i in 4"
              :key="i"
              type="rect"
              height="130px"
            />
          </template>

          <template v-else>
            <TripPreviewCard
              v-for="trip in trips"
              :key="trip.$id"
              :trip="trip"
              :to="`/trips/preview/${trip.$id}`"
              :disabled="trip.alreadyReserved === trip.totalPassengers"
            />
          </template>
        </q-list>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<route lang="yaml">
meta:
  layout: blank
</route>
