<script setup lang="ts">
import { getPluralNoun } from 'src/shared/utils';
import { ITrip } from 'src/shared/types';
import { useTripSettingsStore } from 'src/stores/trip-settings';

const tripSettingsStore = useTripSettingsStore();

defineProps<{
  trip: ITrip;
}>();
</script>

<template>
  <div class="q-px-lg">
    <span class="text-h6">{{ trip.price * tripSettingsStore.passengers }} ₽</span> за
    {{ tripSettingsStore.passengers }}
    {{ getPluralNoun(tripSettingsStore.passengers, 'пассажира', 'пассажиров', 'пассажиров') }}, осталось
    {{ trip.totalPassengers - trip.passengerIds.length }}
    {{ getPluralNoun(trip.totalPassengers - trip.passengerIds.length, 'место', 'места', 'мест') }}
  </div>
</template>
