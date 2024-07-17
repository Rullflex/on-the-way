<script setup lang="ts">
import { getPluralNoun } from 'src/shared/utils';
import { ITrip } from 'src/shared/types';

defineProps<{
  trip: ITrip
}>();
</script>

<template>
  <div class="q-px-lg">
    <span class="text-h6">{{ trip.price }} ₽</span> за 1 пассажира, осталось
    {{ trip.totalPassengers - trip.passengerIds.length }}
    {{ getPluralNoun(trip.totalPassengers - trip.passengerIds.length, 'место', 'места', 'мест') }}
  </div>
</template>
