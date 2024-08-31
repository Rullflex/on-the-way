<script setup lang="ts">
import StepContainer from 'pages/publish/ui/StepContainer.vue';
import { Response } from 'src/shared/api';
import { ITrip } from 'src/shared/types';

defineProps<{
  driverTrips: Response<ITrip>[];
}>();
</script>

<template>
  <StepContainer>
    <div class="column gap-lg q-pa-lg">
      <h5>Выберите шаблон из ваших предыдущих поездок или создайте новую</h5>

      <q-list
        bordered
        separator
        class="rounded-borders overflow-hidden"
      >
        <q-item
          v-for="trip in driverTrips"
          :key="trip.$id"
          clickable
          @click="$emit('create-history', trip)"
        >
          <div class="row justify-between items-center full-width no-wrap">
            <div class="col-auto column">
              <span class="text-bold">{{ trip.departureCity }}</span>
              <span class="text-subtitle2">{{
                trip.canPickUpFromPlace ? 'Заберу с места' : trip.departureAddress
              }}</span>
            </div>

            <q-icon name="eva-arrow-forward-outline" />

            <div class="col-auto column text-right">
              <span class="text-bold">{{ trip.arrivalCity }}</span>
              <span class="text-subtitle2">{{ trip.canDriveToPlace ? 'Довезу до места' : trip.arrivalAddress }}</span>
            </div>
          </div>
        </q-item>
      </q-list>

      <q-btn
        outline
        unelevated
        label="Создать новую"
        class="full-width"
        size="md"
        icon="eva-plus-circle-outline"
        @click="$emit('create-new')"
      />
    </div>
  </StepContainer>
</template>
