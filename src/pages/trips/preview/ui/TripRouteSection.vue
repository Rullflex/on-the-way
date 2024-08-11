<script setup lang="ts">
import { ITrip } from 'src/shared/types';
import { formatDate } from 'src/shared/utils';
const props = defineProps<{
  trip: ITrip;
}>();
</script>

<template>
  <div class="q-px-lg">
    <h5 class="q-mb-lg">{{ formatDate(props.trip?.departureDate ?? '') }}</h5>

    <div class="column">
      <span class="text-bold">{{ trip.canPickUpFromPlace ? 'Заберу с места' : trip.departureAddress }}</span>
      <span class="text-subtitle2">{{ trip.departureCity }}</span>
      <span class="text-subtitle2">{{ trip.departureTime }}</span>

      <q-icon
        name="eva-more-vertical-outline"
        class="q-my-sm"
      />

      <div
        v-for="city in trip.intermediateCities"
        :key="city"
      >
        <div class="text-subtitle2">{{ city }}</div>

        <q-icon
          name="eva-more-vertical-outline"
          class="q-my-sm"
        />
      </div>

      <span class="text-bold">{{ trip.canDriveToPlace ? 'Довезу до места' : trip.arrivalAddress }}</span>
      <span class="text-subtitle2">{{ trip.arrivalCity }}</span>
    </div>
  </div>
</template>
