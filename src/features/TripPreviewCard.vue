<script lang="ts" setup>
import { date as QDate } from 'quasar';
import { getAvatarURL } from 'src/shared/api';
import { ITrip } from 'src/shared/types';
import { MyAvatar } from 'src/shared/ui';

interface IProps {
  disabled?: boolean;
  trip: ITrip;
}

const props = defineProps<IProps>();
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
      <span class="text-subtitle2">{{ trip.departureCity }}</span>
      <span class="text-caption">{{ QDate.formatDate(trip.departureTime, 'HH:mm') }}</span>

      <q-icon
        name="eva-more-vertical-outline"
        class="q-my-sm"
      />

      <span class="text-subtitle2">{{ trip.arrivalCity }}</span>
      <span class="text-caption">{{ QDate.formatDate(trip.arrivalTime, 'HH:mm') }}</span>
    </div>

    <q-separator
      vertical
      spaced
      inset
    />

    <div class="col column gap-sm">
      <div class="row justify-between">
        <my-avatar :src="trip.driver.avatarFileId ? getAvatarURL(trip.driver.avatarFileId) : ''" />

        <div class="col-auto column items-end">
          <span class="text-bold">{{
            trip.alreadyReserved === trip.totalPassengers ? 'Мест нет' : trip.price + ' ₽'
          }}</span>
          <div class="row items-center gap-xs text-caption">
            <span>{{ trip.alreadyReserved }}/{{ trip.totalPassengers }}</span>
            <q-icon name="eva-people-outline" />
          </div>
        </div>
      </div>

      <div class="row">
        <div class="column">
          <span class="text-subtitle2">{{ trip.driver.name }}</span>
          <span class="text-caption">{{ trip.driver.cars[0]?.name }}</span>
        </div>
      </div>

      <div class="row q-mt-auto gap-sm justify-end">
        <q-icon
          v-for="icon in [
            { name: 'cube', type: 'eva' },
            { name: 'briefcase', type: 'eva' },
            { name: 'air', type: 'material' },
            { name: 'child_care', type: 'material' },
            { name: 'pets', type: 'material' },
            { name: 'social_distance', type: 'material' },
          ]"
          :key="icon.name"
          :name="icon.type === 'eva' ? `eva-${icon.name}-outline` : icon.name"
          size="1.2rem"
        />
      </div>
    </div>
  </q-item>
</template>
