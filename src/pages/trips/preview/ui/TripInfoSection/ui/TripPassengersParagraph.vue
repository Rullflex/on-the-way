<script setup lang="ts">
import { getAvatarURL, Response } from 'src/shared/api';
import { MyAvatar } from 'src/shared/ui';
import MyItem from 'src/shared/ui/MyItem.vue';
import { IUser } from 'src/shared/types';
import { getPassengers } from 'pages/trips/preview/api';
import { captureApiException } from 'src/shared/utils';

type Passenger = Response<IUser>;
type PassengerWithSeats = Passenger & { seats: number };

const props = defineProps<{
  passengerIds: string[];
}>();

const passengers = ref<Response<IUser>[]>([]);

const uniquePassengers = computed<PassengerWithSeats[]>(() => {
  const seats: Record<string, number> = {};
  props.passengerIds.forEach((id) => (seats[id] ? seats[id]++ : (seats[id] = 1)));
  return passengers.value.map((passenger) => ({ ...passenger, seats: seats[passenger.$id] }));
});

const fetchPassengers = () => {
  if (!props.passengerIds.length) {
    return;
  }

  getPassengers(props.passengerIds)
    .then((response) => (passengers.value = response.documents))
    .catch(captureApiException);
};

watch(() => props.passengerIds, fetchPassengers, { immediate: true });
</script>

<template>
  <q-item-label header>Пассажиры</q-item-label>

  <my-item
    v-if="!passengerIds.length"
    label="Пока еще нет пассажиров"
  />

  <template v-else>
    <my-item
      v-for="passenger in uniquePassengers"
      :key="passenger.$id"
      chevron
      :label="passenger.name"
      :to="`/profile/preview/${passenger.$id}`"
    >
      <template #append>
        <my-avatar :src="passenger.avatarFileId ? getAvatarURL(passenger.avatarFileId) : ''">
          <q-badge
            v-if="passenger.seats > 1"
            rounded
            floating
            color="primary"
          >
            {{ passenger.seats }}
          </q-badge>
        </my-avatar>
      </template>
    </my-item>
  </template>
</template>
