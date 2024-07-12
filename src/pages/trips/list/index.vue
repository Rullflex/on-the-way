<script setup lang="ts">
import { captureApiException } from 'src/shared/utils';
import { getTripsByDate, Response } from 'src/shared/api';
import { ITrip } from 'src/shared/types';
import PageHeader from './ui/PageHeader.vue';
import TripPreviewCard from 'src/features/TripPreviewCard.vue';
import { useTripSettingsStore } from 'src/stores/trip-settings';

const isLoading = ref<boolean>(true);
const trips = ref<Response<ITrip>[]>([]);

const route = useRoute();
const router = useRouter();
const store = useTripSettingsStore();

if (store.origin && store.destination && store.date) {
  router.replace({
    query: {
      origin: store.origin,
      destination: store.destination,
      date: store.date,
      passengers: String(store.passengers),
    },
  });
} else if (route.query.origin && route.query.destination && route.query.date) {
  store.$patch({
    origin: route.query.origin as string,
    destination: route.query.destination as string,
    date: route.query.date as string,
    passengers: Number(route.query.passengers as string),
  });
} else {
  router.push({ path: '/search', replace: true });
}

getTripsByDate(store.date)
  .then((response) => (trips.value = response.documents))
  .catch(captureApiException)
  .finally(() => (isLoading.value = false));
</script>

<template>
  <q-layout>
    <PageHeader />

    <q-page-container>
      <q-page class="q-pa-lg">
        <div
          v-if="isLoading"
          class="column gap-sm"
        >
          <q-skeleton
            v-for="i in 4"
            :key="i"
            type="rect"
            height="150px"
          />
        </div>

        <q-list
          v-else-if="trips.length"
          class="column gap-sm"
        >
          <TripPreviewCard
            v-for="trip in trips"
            :key="trip.$id"
            :trip="trip"
            :to="`/trips/preview/${trip.$id}`"
            :disabled="trip.alreadyReserved === trip.totalPassengers"
          />
        </q-list>

        <template v-else>
          <div class="column flex-center text-center gap-lg">
            <q-img
              noSpinner
              width="80%"
              src="~/assets/travel-mode.svg"
              style="max-width: 300px"
            />
            <h4>На текущую дату нет доступных поездок</h4>
          </div>
        </template>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<route lang="yaml">
meta:
  layout: blank
</route>
