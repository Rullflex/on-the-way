<script setup lang="ts">
import { AppwriteException } from 'appwrite';
import ReserveTripButton from './ReserveTripButton.vue';
import { captureApiException } from 'src/shared/utils';
import { cancelReservation, cancelTrip, pauseTrip, unpauseTrip, reserveTrip } from '../api';
import { Loading } from 'quasar';
import { ITrip } from 'src/shared/types';
import { useUserStore } from 'src/stores/user';
import DriverTripButtons from './DriverTripButtons.vue';
import { TripStatus } from 'src/shared/constants';

interface IProps {
  tripId: string;
  isCurrentUserDriver: boolean;
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

const handleSubmit = async (apiFn: () => Promise<ITrip>) => {
  Loading.show();
  try {
    trip.value = await apiFn();
  } catch (error) {
    captureApiException(error as AppwriteException);
  } finally {
    Loading.hide();
  }
};
</script>

<template>
  <div class="sticky-bottom q-pa-md bg-white">
    <template v-if="trip.status === TripStatus.CANCELED">
      <q-btn
        size="md"
        disabled
        color="red-3"
        unelevated
        class="full-width"
        icon="eva-slash-outline"
        label="Поездка отменена"
      />
    </template>
    <div
      v-else-if="isCurrentUserDriver"
      :class="$style['driver-row']"
    >
      <DriverTripButtons
        :status="trip.status"
        @cancel="handleSubmit(() => cancelTrip(props.tripId))"
        @pause="handleSubmit(() => pauseTrip(props.tripId))"
        @unpause="handleSubmit(() => unpauseTrip(props.tripId))"
      />
    </div>

    <ReserveTripButton
      v-else
      class="full-width"
      :is-already-reserved="isAlreadyReserved"
      @submit="handleSubmitReserve"
    />
  </div>
</template>

<style lang="scss" module>
.driver-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}
</style>
