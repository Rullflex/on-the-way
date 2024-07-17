<script setup lang="ts">
import { getAvatarURL, Response } from 'src/shared/api';
import ParagraphSeparator from 'pages/trips/preview/ui/ParagraphSeparator.vue';
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
  getPassengers(props.passengerIds)
    .then((response) => (passengers.value = response.documents))
    .catch(captureApiException);
};

watch(props.passengerIds, fetchPassengers, { immediate: true });
</script>

<template>
  <ParagraphSeparator />

  <q-item-label header>Пассажиры</q-item-label>

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
