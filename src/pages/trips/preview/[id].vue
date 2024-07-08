<script setup lang="ts">
import MyItem from 'src/shared/ui/MyItem.vue';
import { captureApiException, getPluralNoun } from 'src/shared/utils';
import { MONTHS_NAMES_IN_GENITIVE } from 'src/shared/constants';
import { MyBackBtn } from 'src/shared/ui';
import { getTripById, ITrip, Response } from 'src/shared/api';
import { Loading, date as QDate } from 'quasar';

const props = defineProps<{ id: string }>();
const trip = ref<Response<ITrip>>();

const tripDate = computed(() => {
  const monthIndex = Number(QDate.formatDate(trip.value?.departureTime, 'M')) - 1;
  return `${QDate.formatDate(trip.value?.departureTime, 'ddd, D')} ${MONTHS_NAMES_IN_GENITIVE[monthIndex]}`;
});

Loading.show();
getTripById(props.id)
  .then((response) => (trip.value = response))
  .catch(captureApiException)
  .finally(Loading.hide);
</script>

<template>
  <q-layout>
    <q-page-container>
      <q-page
        v-if="trip"
        class="q-pb-lg"
      >
        <div class="sticky-top bg-white q-pa-md z-top">
          <my-back-btn fallback-route="/trips/list" />
        </div>

        <div class="q-px-lg">
          <h5 class="q-mb-lg">{{ tripDate }}</h5>

          <div class="column">
            <span class="text-bold">{{ trip.canPickUpFromPlace ? 'Заберу с места' : trip.departureAddress }}</span>
            <span class="text-subtitle2">{{ trip.departureCity }}</span>
            <span class="text-subtitle2">{{ QDate.formatDate(trip.departureTime, 'HH:mm') }}</span>

            <q-icon
              name="eva-more-vertical-outline"
              class="q-my-sm"
            />

            <span class="text-bold">{{ trip.canDriveToPlace ? 'Довезу до места' : trip.arrivalAddress }}</span>
            <span class="text-subtitle2">{{ trip.arrivalCity }}</span>
            <span class="text-subtitle2">{{ QDate.formatDate(trip.arrivalTime, 'HH:mm') }}</span>
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
            to="/profile/preview/1"
          >
            <template #append>
              <q-avatar
                color="grey-4"
                text-color="white"
                size="2.5rem"
              >
              </q-avatar>
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

          <q-item>
            <q-item-section side>
              <q-icon name="eva-car-outline" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ trip.driver.cars[0]?.name }}</q-item-label>
              <q-item-label caption>
                {{ trip.driver.cars[0]?.year }}, {{ trip.driver.cars[0]?.color }}
                <q-chip dense>{{ trip.driver.cars[0]?.licensePlate }}</q-chip>
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-separator
            spaced
            inset
          />

          <my-item
            icon="eva-cube-outline"
            label="Заберу посылки"
          />

          <my-item
            icon="eva-briefcase-outline"
            label="Можно с багажом"
          />
        </q-list>

        <q-separator
          spaced="1rem"
          size="0.5rem"
        />

        <q-list>
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
    </q-page-container>
  </q-layout>
</template>

<route lang="yaml">
meta:
  layout: blank
</route>
