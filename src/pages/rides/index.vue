<script setup lang="ts">
import TripPreviewCard from 'src/features/TripPreviewCard.vue';
import { Response } from 'src/shared/api';
import { ITrip } from 'src/shared/types';
import { MyItem } from 'src/shared/ui';
import { captureApiException, formatDate } from 'src/shared/utils';
import { useUserStore } from 'src/stores/user';
import { getFutureUserTrips } from './api';
import { EmptyRides } from './ui';

const $q = useQuasar();
const userStore = useUserStore();
const userTrips = ref<Response<ITrip>[]>();

const groupedTrips = computed(() =>
  userTrips.value?.reduce((acc, trip) => {
    const date = trip.departureDate;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(trip);
    return acc;
  }, {} as Record<string, Response<ITrip>[]>)
);

$q.loading.show();
getFutureUserTrips(userStore.accountId)
  .then((response) => (userTrips.value = response.documents))
  .catch(captureApiException)
  .finally($q.loading.hide);
</script>

<template>
  <q-page
    v-if="userTrips"
    padding
  >
    <div
      v-if="userTrips.length"
      class="column gap-md q-pa-md"
    >
      <h4 class="q-mb-md">Ближайшие поездки</h4>

      <div
        v-for="(trips, date) in groupedTrips"
        :key="date"
      >
        <h5 class="q-mb-md">{{ formatDate(date) }}</h5>
        <q-list class="column gap-sm">
          <TripPreviewCard
            v-for="trip in trips"
            :key="trip.$id"
            :trip="trip"
            :to="`/trips/preview/${trip.$id}`"
          />
        </q-list>
      </div>
    </div>

    <EmptyRides v-else />

    <MyItem
      chevron
      label="Архив поездок"
      to="/rides/archive"
    />
  </q-page>
</template>
