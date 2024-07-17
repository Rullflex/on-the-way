<script setup lang="ts">
import { AppwriteException } from 'appwrite';
import ReserveTripButton from './ReserveTripButton.vue';
import { captureApiException } from 'src/shared/utils';
import { cancelReservation, reserveTrip } from '../api';
import { Loading } from 'quasar';
import { ITrip } from 'src/shared/types';
import { useUserStore } from 'src/stores/user';

interface IProps {
  tripId: string;
}

const trip = defineModel<ITrip>({ required: true });
const props = defineProps<IProps>();

const userStore = useUserStore();

const isAlreadyReserved = computed(() => {
  return Boolean(trip.value?.passengerIds.find((id) => id === userStore.accountId));
});

const handleSubmitReserve = async () => {
  Loading.show();
  try {
    if (!isAlreadyReserved.value) {
      const response = await reserveTrip(props.tripId);
      response && (trip.value = response);
    } else {
      trip.value = await cancelReservation(props.tripId);
    }
  } catch (error) {
    captureApiException(error as AppwriteException);
  } finally {
    Loading.hide();
  }
};
</script>

<template>
  <div class="sticky-bottom q-pa-md bg-white">
    <ReserveTripButton
      class="full-width"
      :is-already-reserved="isAlreadyReserved"
      @submit="handleSubmitReserve"
    />
  </div>
</template>
