<script setup lang="ts">
import { getAvatarURL, Response } from 'src/shared/api';
import { MyAvatar } from 'src/shared/ui';
import MyItem from 'src/shared/ui/MyItem.vue';
import { IUser } from 'src/shared/types';
import { getPassengers } from 'pages/trips/preview/api';
import { captureApiException } from 'src/shared/utils';

const props = defineProps<{
  passengerIds: string[];
}>();

const passengers = ref<Response<IUser>[]>([]);

const fetchPassengers = () => {
  if (!props.passengerIds.length) {
    return;
  }

  getPassengers(props.passengerIds)
    .then((response) => (passengers.value = response.documents))
    .catch(captureApiException);
};

watch(props.passengerIds, fetchPassengers, { immediate: true });
</script>

<template>
  <q-item-label header>Пассажиры</q-item-label>

  <my-item
    v-if="!passengerIds.length"
    label="Пока еще нет пассажиров"
  />

  <my-item
    v-for="passenger in passengers"
    :key="passenger.$id"
    chevron
    :label="passenger.name"
    :to="`/profile/preview/${passenger.$id}`"
  >
    <template #append>
      <my-avatar :src="passenger.avatarFileId ? getAvatarURL(passenger.avatarFileId) : ''" />
    </template>
  </my-item>
</template>
