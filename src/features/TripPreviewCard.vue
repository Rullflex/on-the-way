<script lang="ts" setup>
import { getAvatarURL } from 'src/shared/api';
import { TRIP_CONVENIENCES } from 'src/shared/constants';
import { ITrip } from 'src/shared/types';
import { MyAvatar } from 'src/shared/ui';

interface IProps {
  disabled?: boolean;
  trip: ITrip;
}

const props = defineProps<IProps>();

const conveniences = computed(() =>
  TRIP_CONVENIENCES.filter((convenience) => props.trip.conveniences.includes(convenience.name))
);
</script>

<template>
  <q-item
    clickable
    :disable="props.disabled"
    class="row rounded-borders bg-white shadow-2 q-pa-md"
  >
    <div
      class="column overflow-hidden"
      style="width: 72px"
    >
      <span class="text-bold">{{ trip.departureTime }}</span>

      <span class="text-subtitle2">{{ trip.departureCity }}</span>

      <q-icon
        name="eva-more-vertical-outline"
        class="q-my-sm"
      />

      <span class="text-subtitle2">{{ trip.arrivalCity }}</span>
    </div>

    <q-separator
      vertical
      spaced
      inset
    />

    <div class="col column gap-sm">
      <div class="row justify-between">
        <my-avatar :src="trip.driver?.avatarFileId ? getAvatarURL(trip.driver.avatarFileId) : ''" />

        <div
          v-if="trip.passengerIds"
          class="col-auto column items-end"
        >
          <span class="text-bold">{{
            trip.passengerIds.length >= trip.totalPassengers ? 'Мест нет' : trip.price + ' ₽'
          }}</span>
          <div class="row items-center gap-xs text-caption">
            <span>{{ trip.passengerIds.length }}/{{ trip.totalPassengers }}</span>
            <q-icon name="eva-people-outline" />
          </div>
        </div>
      </div>

      <div class="row">
        <div class="column">
          <span class="text-subtitle2">{{ trip.driver?.name }}</span>
          <span class="text-caption">{{ trip.car?.name }}</span>
        </div>
      </div>

      <div class="row q-mt-auto gap-sm justify-end">
        <q-icon
          v-for="convenience in conveniences"
          :key="convenience.name"
          :name="convenience.icon"
          size="1.2rem"
        />
      </div>
    </div>
  </q-item>
</template>
