<script setup lang="ts">
import { captureApiException } from 'src/shared/utils';
import { Loading } from 'quasar';
import { getAllTrips, ITrip, Response } from 'src/shared/api';
import PageHeader from './ui/PageHeader.vue';
import TripPreviewCard from 'src/features/TripPreviewCard.vue';

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
          <TripPreviewCard
            v-for="trip in trips"
            :key="trip.$id"
            :trip="trip"
            :to="`/trips/preview/${trip.$id}`"
            :disabled="trip.alreadyReserved === trip.totalPassengers"
          />
        </q-list>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<route lang="yaml">
meta:
  layout: blank
</route>
