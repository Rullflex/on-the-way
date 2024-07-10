<script setup lang="ts">
import TripPreviewCard from 'src/features/TripPreviewCard.vue';
import { ITrip } from 'src/shared/types';
import { MyHistoryBackBtn } from 'src/shared/ui';

const testTripData = {
  price: 1000,
  canPickUpFromPlace: true,
  canDriveToPlace: true,
  departureAddress: 'ул. Пушкина, д. 4',
  arrivalAddress: 'ул. Ленина, д. 10',
  departureCity: 'Москва',
  arrivalCity: 'Санкт-Петербург',
  departureTime: Date(),
  arrivalTime: Date(),
  alreadyReserved: 0,
  totalPassengers: 4,
  comment: 'Комментарий',
  conveniences: ['wifi', 'parking'],
  driver: {
    name: 'Иван',
    surname: 'Иванов',
    phone: '+7(999)999-99-99',
    email: 'n0qg6@example.com',
    dateOfBirth: Date(),
    avatarFileId: '',
    cars: [
      {
        name: 'BMW X5',
        year: 2021,
        color: 'black',
        licensePlate: 'А000АА',
        bodyType: 'Седан',
      },
    ],
    trips: [],
  },
} as unknown as ITrip;
</script>

<template>
  <q-layout>
    <q-header
      reveal
      class="bg-white text-blue-grey-8 q-pa-md"
    >
      <MyHistoryBackBtn fallback-route="/rides" />
    </q-header>

    <q-page-container>
      <q-page padding>
        <h5 class="q-px-md q-mb-md">Архив поездок</h5>

        <q-list class="q-pa-md">
          <TripPreviewCard :trip="testTripData" />
        </q-list>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<route lang="yaml">
meta:
  layout: blank
</route>
