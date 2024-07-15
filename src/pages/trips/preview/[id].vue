<script setup lang="ts">
import MyItem from 'src/shared/ui/MyItem.vue';
import { captureApiException, getPluralNoun } from 'src/shared/utils';
import { MyAvatar } from 'src/shared/ui';
import { AppwriteException, getAvatarURL, getTripById, Response } from 'src/shared/api';
import { ITrip, IUser } from 'src/shared/types';
import { Loading } from 'quasar';
import { TRIP_CONVENIENCES } from 'src/shared/constants';
import { useUserStore } from 'src/stores/user';
import ReserveTripButton from './ui/ReserveTripButton.vue';
import { reserveTrip, cancelReservation } from './api';
import { useFormattedDate } from 'src/shared/hooks/useFormattedDate';
import { getPassengers } from './api';

const props = defineProps<{ id: string }>();
const trip = ref<Response<ITrip>>();
const passengers = ref<Response<IUser>[]>([]);
const userStore = useUserStore();

const { shortFormatDate } = useFormattedDate(ref(trip.value?.departureDate ?? ''));

const tripConveniences = computed(() => {
  return trip.value?.conveniences.map((name) => TRIP_CONVENIENCES.find((item) => item.name === name)!) ?? [];
});

const isCurrentUserDriver = computed(() => {
  return trip.value?.driver.$id === userStore.accountId;
});

const isAlreadyReserved = computed(() => {
  return Boolean(trip.value?.passengerIds.find((id) => id === userStore.accountId));
});

const handleSubmitReserve = async () => {
  Loading.show();
  try {
    if (!isAlreadyReserved.value) {
      const response = await reserveTrip(props.id);
      response && (trip.value = response);
    } else {
      trip.value = await cancelReservation(props.id);
    }
  } catch (error) {
    captureApiException(error as AppwriteException);
  } finally {
    Loading.hide();
  }
};

watch(trip, async () => {
  if (trip.value) {
    getPassengers(trip.value.passengerIds)
      .then((response) => (passengers.value = response.documents))
      .catch(captureApiException);
  }
});

Loading.show();
getTripById(props.id)
  .then((response) => (trip.value = response))
  .catch(captureApiException)
  .finally(Loading.hide);
</script>

<template>
  <q-page v-if="trip">
    <div class="q-px-lg">
      <h5 class="q-mb-lg">{{ shortFormatDate }}</h5>

      <div class="column">
        <span class="text-bold">{{ trip.canPickUpFromPlace ? 'Заберу с места' : trip.departureAddress }}</span>
        <span class="text-subtitle2">{{ trip.departureCity }}</span>
        <span class="text-subtitle2">{{ trip.departureTime }}</span>

        <q-icon
          name="eva-more-vertical-outline"
          class="q-my-sm"
        />

        <span class="text-bold">{{ trip.canDriveToPlace ? 'Довезу до места' : trip.arrivalAddress }}</span>
        <span class="text-subtitle2">{{ trip.arrivalCity }}</span>
      </div>
    </div>

    <q-separator
      spaced="1rem"
      size="0.5rem"
    />

    <div class="q-px-lg">
      <span class="text-h6">{{ trip.price }} ₽</span> за 1 пассажира, осталось
      {{ trip.totalPassengers - trip.passengerIds.length }}
      {{ getPluralNoun(trip.totalPassengers - trip.passengerIds.length, 'место', 'места', 'мест') }}
    </div>

    <q-separator
      spaced="1rem"
      size="0.5rem"
    />

    <q-list class="q-px-sm">
      <my-item
        chevron
        :label="trip.driver.name"
        :to="`/profile/preview/${trip.driver.$id}`"
      >
        <template #append>
          <my-avatar :src="trip.driver.avatarFileId ? getAvatarURL(trip.driver.avatarFileId) : ''" />
        </template>
      </my-item>

      <q-item class="q-my-sm">
        <q-item-section>
          <q-btn
            dense
            outline
            size="0.8rem"
            padding="6px"
            label="Позвонить"
            icon="eva-phone-outline"
            :href="`tel:${trip.driver.phone}`"
          />
        </q-item-section>

        <q-item-section>
          <q-btn
            dense
            outline
            size="0.8rem"
            padding="6px"
            label="Написать"
            icon="eva-message-circle-outline"
          />
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section>
          <q-item-label caption>Комментарий</q-item-label>
          <q-item-label>{{ trip.comment }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-separator
        spaced
        inset
      />

      <q-item v-if="trip.car">
        <q-item-section side>
          <q-icon name="eva-car-outline" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ trip.car.name }}</q-item-label>
          <q-item-label caption>
            {{ trip.car.year }}, {{ trip.car.color }}
            <q-chip
              v-if="trip.car.licensePlate"
              dense
              :label="trip.car.licensePlate"
            />
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-separator
        spaced
        inset
      />

      <my-item
        v-for="convenience in tripConveniences"
        :key="convenience?.name"
        :icon="convenience?.icon"
        :label="convenience?.title"
      />

      <template v-if="passengers.length">
        <q-separator
          spaced
          inset
        />

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
    </q-list>

    <q-separator
      spaced="1rem"
      size="0.5rem"
    />

    <q-list class="q-px-sm">
      <my-item
        color="primary"
        label="Поделиться поездкой"
      />

      <my-item
        color="primary"
        label="Пожаловаться на поездку"
      />
    </q-list>

    <div
      v-if="!isCurrentUserDriver"
      class="sticky-bottom q-pa-md bg-white"
    >
      <ReserveTripButton
        class="full-width"
        :is-already-reserved="isAlreadyReserved"
        @submit="handleSubmitReserve"
      />
    </div>
  </q-page>
</template>

<route lang="yaml">
meta:
  layout: subPage
</route>
