<script setup lang="ts">
import { captureApiException } from 'src/shared/utils';
import { AppwriteException, Response } from 'src/shared/api';
import { ITrip } from 'src/shared/types';
import PageHeader from './ui/PageHeader.vue';
import TripPreviewCard from 'src/features/TripPreviewCard.vue';
import { useTripSettingsStore } from 'src/stores/trip-settings';
import { getFilteredTrips } from './api';
import FiltersModal from './ui/FiltersModal.vue';
import { TripConveniencesNames } from 'src/shared/enums';

const isLoading = ref<boolean>(false);
const isFilterModalOpen = ref<boolean>(false);
const trips = ref<Response<ITrip>[]>([]);
const conveniences = ref<TripConveniencesNames[]>([]);

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

const updateTrips = async () => {
  isLoading.value = true;
  try {
    const response = await getFilteredTrips({
      date: store.date,
      origin: store.origin,
      destination: store.destination,
      conveniences: conveniences.value,
    });

    trips.value = response.documents.filter(
      (trip) => trip.totalPassengers - trip.passengerIds.length >= store.passengers
    );
  } catch (error) {
    captureApiException(error as AppwriteException);
  } finally {
    isLoading.value = false;
  }
};

updateTrips();
</script>

<template>
  <q-layout>
    <PageHeader @open-filters="isFilterModalOpen = true" />

    <FiltersModal
      v-model="isFilterModalOpen"
      @apply-filters="(conveniences = $event), updateTrips()"
    />

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
            :disabled="trip.passengerIds.length >= trip.totalPassengers"
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
            <h4>Для выбранных условий нет доступных поездок</h4>
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
