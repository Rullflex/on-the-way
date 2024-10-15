<script setup lang="ts">
import { captureApiException, getPluralNoun } from 'src/shared/utils';
import { getTripById, Response } from 'src/shared/api';
import { ITrip } from 'src/shared/types';
import { Loading, Notify } from 'quasar';
import { useUserStore } from 'src/stores/user';
import SectionSeparator from './ui/SectionSeparator.vue';
import TripRouteSection from './ui/TripRouteSection.vue';
import TripPriceSection from './ui/TripPriceSection.vue';
import TripInfoSection from './ui/TripInfoSection/TripInfoSection.vue';
import BottomSheetSection from './ui/BottomSheetSection.vue';
import StickyBottomSection from './ui/StickyBottomSection.vue';

const props = defineProps<{ id: string }>();
const trip = ref<Response<ITrip>>();
const userStore = useUserStore();

let timer: ReturnType<typeof setInterval> | null = null;

const isCurrentUserDriver = computed(() => {
  return trip.value?.driver.$id === userStore.accountId;
});

const canShare = Boolean(navigator.share || navigator.clipboard?.writeText);

const share = async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: 'По Пути - сервис поиска попутчиков',
        text: `Поездка ${trip.value?.departureCity} - ${trip.value?.arrivalCity} | По Пути`,
        url: '',
      });
    } catch (error) {}
  } else if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(location.href);
      Notify.create({
        message: 'Ссылка скопированна в буфер обмена',
        position: 'top',
      });
    } catch (error) {}
  }
};

onMounted(() => {
  const fetchTrip = () => {
    getTripById(props.id).then((response) => {
      if (isCurrentUserDriver.value && trip.value) {
        const passengerDiff = Math.abs(response.passengerIds.length - trip.value.passengerIds.length)

        if (passengerDiff > 0) {
          const passenger = getPluralNoun(passengerDiff, 'пассажир', 'пассажира', 'пассажиров')
          const message = trip.value.passengerIds.length > response.passengerIds.length
            ? `${passengerDiff} ${passenger} ${getPluralNoun(passengerDiff, 'отменил', 'отменили', 'отменили')} бронь`
            : `${passengerDiff} ${getPluralNoun(passengerDiff, 'новый', 'новых', 'новых')} ${passenger}`
          Notify.create({
            type: 'warning',
            message,
            position: 'top',
          });
        }
      }

      trip.value = response
    }).catch()
  }
  timer = setInterval(fetchTrip, 1000 * 10);
})

onBeforeUnmount(() => {
  if (timer !== null) {
    clearInterval(timer);
  }
})

Loading.show();
getTripById(props.id)
  .then((response) => (trip.value = response))
  .catch(captureApiException)
  .finally(Loading.hide);
</script>

<template>
  <q-page v-if="trip">
    <TripRouteSection :trip="trip" />

    <SectionSeparator />

    <TripPriceSection :trip="trip" />

    <SectionSeparator />

    <TripInfoSection :trip="trip" />

    <template v-if="canShare">
      <SectionSeparator />

      <BottomSheetSection @share="share" />
    </template>

    <StickyBottomSection
      :isCurrentUserDriver
      :trip-id="props.id"
      v-model="trip"
    />
  </q-page>
</template>

<route lang="yaml">
meta:
  layout: subPage
</route>
