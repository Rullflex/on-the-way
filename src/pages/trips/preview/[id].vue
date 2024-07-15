<script setup lang="ts">
import MyItem from 'src/shared/ui/MyItem.vue';
import { captureApiException, getPluralNoun } from 'src/shared/utils';
import { MONTHS_NAMES_IN_GENITIVE } from 'src/shared/constants';
import { MyAvatar, MyBackBtn } from 'src/shared/ui';
import { getAvatarURL, getTripById, Response } from 'src/shared/api';
import { ITrip } from 'src/shared/types';
import { Loading, date as QDate } from 'quasar';
import { TRIP_CONVENIENCES } from 'src/shared/constants';

const props = defineProps<{ id: string }>();
const trip = ref<Response<ITrip>>();

const tripDate = computed(() => {
  if (!trip.value?.departureDate) {
    return '';
  }

  const monthIndex = Number(QDate.formatDate(trip.value.departureDate, 'M')) - 1;
  return `${QDate.formatDate(trip.value.departureDate, 'ddd, D')} ${MONTHS_NAMES_IN_GENITIVE[monthIndex]}`;
});

const tripConveniences = computed(() => {
  return trip.value?.conveniences.map((name) => TRIP_CONVENIENCES.find((item) => item.name === name)!) ?? [];
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
      <h5 class="q-mb-lg">{{ tripDate }}</h5>

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
      {{ trip.totalPassengers - trip.alreadyReserved }}
      {{ getPluralNoun(trip.totalPassengers - trip.alreadyReserved, 'место', 'места', 'мест') }}
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
  </q-page>
</template>

<route lang="yaml">
meta:
  layout: subPage
</route>
