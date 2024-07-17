<script setup lang="ts">
import ParagraphSeparator from 'pages/trips/preview/ui/ParagraphSeparator.vue';
import { ITrip } from 'src/shared/types';
import DriverInfoParagraph from './ui/DriverInfoParagraph.vue';
import CarInfoParagraph from './ui/CarInfoParagraph.vue';
import TripConveniencesParagraph from 'pages/trips/preview/ui/TripInfoSection/ui/TripConveniencesParagraph.vue';
import TripPassengersParagraph from 'pages/trips/preview/ui/TripInfoSection/ui/TripPassengersParagraph.vue';

const props = defineProps<{ trip: ITrip }>();
</script>

<template>
  <q-list class="q-px-sm">
    <DriverInfoParagraph
      :driver="props.trip.driver"
      :comment="props.trip.comment"
    />

    <ParagraphSeparator />

    <CarInfoParagraph
      v-if="props.trip.car"
      :car="props.trip.car"
    />

    <ParagraphSeparator />

    <TripConveniencesParagraph :conveniences="props.trip.conveniences" />

    <TripPassengersParagraph
      v-if="props.trip.passengerIds?.length"
      :passenger-ids="props.trip.passengerIds"
    />
  </q-list>
</template>
