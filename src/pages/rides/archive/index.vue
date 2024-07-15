<script setup lang="ts">
import { Loading } from 'quasar';
import { captureApiException } from 'src/shared/utils';
import { getArchivedUserTrips } from './api';
import { useUserStore } from 'src/stores/user';
import { ITrip } from 'src/shared/types';
import { Response } from 'src/shared/api';
import TripPreviewCard from 'src/features/TripPreviewCard.vue';

const userStore = useUserStore();
const archivedTrips = ref<Response<ITrip>[]>();

const pageTitle = computed(() => (archivedTrips.value?.length ? 'Архив поездок' : 'В архиве поездок пока пусто'));

Loading.show();
getArchivedUserTrips(userStore.accountId)
  .then((response) => (archivedTrips.value = response.documents))
  .catch(captureApiException)
  .finally(Loading.hide);
</script>

<template>
  <q-page
    v-if="archivedTrips"
    padding
  >
    <h5 class="q-px-md q-mb-md">{{ pageTitle }}</h5>

    <q-list
      v-if="archivedTrips.length"
      class="column gap-sm q-pa-md"
    >
      <TripPreviewCard
        v-for="trip in archivedTrips"
        :key="trip.$id"
        :trip="trip"
        :to="`/trips/preview/${trip.$id}`"
      />
    </q-list>
  </q-page>
</template>

<route lang="yaml">
meta:
  layout: subPage
  fallbackRoute: '/rides'
</route>
