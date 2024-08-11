<script setup lang="ts">
import TripPreviewCard from 'src/features/TripPreviewCard.vue';
import { Response } from 'src/shared/api';
import { ITrip } from 'src/shared/types';
import { MyItem } from 'src/shared/ui';
import { captureApiException } from 'src/shared/utils';
import { useUserStore } from 'src/stores/user';
import { getFutureUserTrips } from './api';
import { EmptyRides } from './ui';

const $q = useQuasar();
const userStore = useUserStore();
const userTrips = ref<Response<ITrip>[]>();

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
    <template v-if="userTrips.length">
      <h4 class="q-pa-md">Ближайшие поездки</h4>

      <q-list class="column gap-sm q-pa-md">
        <TripPreviewCard
          v-for="trip in userTrips"
          :key="trip.$id"
          :trip="trip"
          :to="`/trips/preview/${trip.$id}`"
        />
      </q-list>
    </template>

    <EmptyRides v-else />

    <MyItem
      chevron
      label="Архив поездок"
      to="/rides/archive"
    />
  </q-page>
</template>
