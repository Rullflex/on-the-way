<script setup lang="ts">
import { captureApiException } from 'src/shared/utils';
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
