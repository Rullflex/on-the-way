<script setup lang="ts">
import { CITY_NAMES } from 'src/shared/constants';
import { MyBackBtn } from 'src/shared/ui';
import { useStep } from 'src/shared/hooks/useStep';
import CityStep from './ui/CityStep.vue';
import LocationStep from './ui/LocationStep.vue';
import IntermediateCitiesStep from './ui/IntermediateCitiesStep.vue';
import DateStep from './ui/DateStep.vue';
import TimeStep from 'pages/publish/ui/TimeStep.vue';
import TripConveniencesStep from 'pages/publish/ui/TripConveniencesStep.vue';
import { TripConveniencesNames } from 'src/shared/enums';
import PriceStep from 'pages/publish/ui/PriceStep.vue';
import CarSelectionStep from 'pages/publish/ui/CarSelectionStep.vue';
import CommentStep from 'pages/publish/ui/CommentStep.vue';
import PassengersAmountStep from 'pages/publish/ui/PassengersAmountStep.vue';
import { createTrip } from 'src/shared/api';
import { useUserStore } from 'stores/user';
import { captureApiException } from 'src/shared/utils';
import { AppwriteException } from 'appwrite';
import UiPageButton from 'src/shared/ui/UiPageButton.vue';
import UiNextStepButton from 'src/shared/ui/UiNextStepButton.vue';

defineOptions({
  name: 'PublishPage'
});

enum StepNames {
  departureCity,
  departureLocation,
  destinationCity,
  destinationLocation,
  intermediateCities,
  date,
  time,
  car,
  passengersAmount,
  price,
  tripConveniences,
  comment,
}

export interface ICityInfo {
  city: string;
  location: string;
  canDriveToPassengerLocation: boolean;
}

const initialCityState: ICityInfo = {
  city: '',
  location: '',
  canDriveToPassengerLocation: false
};

const userStore = useUserStore();

const $q = useQuasar();

const departureCity = ref<ICityInfo>({ ...initialCityState });
const destinationCity = ref<ICityInfo>({ ...initialCityState });
const intermediateCities = ref<string[]>([]);
const date = ref('');
const time = ref('');
const price = ref('');
const carId = ref('');
const passengersAmount = ref(4);
const tripConveniences = shallowRef<TripConveniencesNames[]>([]);
const { currentStep, stepAnimationName } = useStep(StepNames.departureCity);
const comment = ref('');

const isNextButtonVisible = computed<boolean>(() => {
  if (currentStep.value === StepNames.departureCity) {
    return Boolean(departureCity.value.city);
  } else if (currentStep.value === StepNames.departureLocation) {
    return Boolean(departureCity.value.location) || departureCity.value.canDriveToPassengerLocation;
  } else if (currentStep.value === StepNames.destinationCity) {
    return Boolean(destinationCity.value.city);
  } else if (currentStep.value === StepNames.destinationLocation) {
    return Boolean(destinationCity.value.location) || destinationCity.value.canDriveToPassengerLocation;
  } else if (currentStep.value === StepNames.intermediateCities) {
    return true;
  } else if (currentStep.value === StepNames.date) {
    return Boolean(date.value);
  } else if (currentStep.value === StepNames.time) {
    return Boolean(time.value);
  } else if (currentStep.value === StepNames.car) {
    return Boolean(carId.value);
  } else if (currentStep.value === StepNames.passengersAmount) {
    return Boolean(passengersAmount);
  } else if (currentStep.value === StepNames.tripConveniences) {
    return true;
  } else if (currentStep.value === StepNames.price && price.value) {
    return parseInt(price.value) > 0;
  }

  return false;
});

const handleCityChoose = (city: ICityInfo, cityName: string) => {
  city.city = cityName;
  currentStep.value++;
};

const handleCityLocationChange = (city: ICityInfo, value: string) => {
  city.location = value;
  city.canDriveToPassengerLocation = false;
};

const handleCityOptionChoose = (city: ICityInfo) => {
  city.canDriveToPassengerLocation = true;
  currentStep.value++;
};

const router = useRouter();
const handlePublishBtnClick = async () => {
  $q.loading.show();

  const tripData: Parameters<typeof createTrip>[0] = {
    price: parseInt(price.value),
    departureDate: date.value,
    departureTime: time.value,
    totalPassengers: passengersAmount.value,
    alreadyReserved: 0,
    conveniences: tripConveniences.value,
    departureCity: departureCity.value.city,
    arrivalCity: destinationCity.value.city,
    departureAddress: departureCity.value.location,
    arrivalAddress: destinationCity.value.location,
    intermediateCities: intermediateCities.value,
    canPickUpFromPlace: departureCity.value.canDriveToPassengerLocation,
    canDriveToPlace: destinationCity.value.canDriveToPassengerLocation,
    driver: userStore.accountId,
    comment: comment.value,
    car: carId.value
  };
  try {
    await createTrip(tripData);
    $q.notify({
      message: 'Поездка успешно опубликована',
      position: 'top',
      color: 'positive'
    });
    await router.push({ path: '/rides' });
  } catch (error) {
    captureApiException(error as AppwriteException);
  } finally {
    $q.loading.hide();
  }
};
</script>

<template>
  <q-page>
    <MyBackBtn
      v-if="currentStep !== StepNames.departureCity"
      class="q-ml-md q-mt-md"
      @click="currentStep--"
    />

    <transition :name="stepAnimationName">
      <CityStep
        v-if="currentStep === StepNames.departureCity"
        title="Откуда вы выезжаете?"
        :city-name="departureCity.city"
        :city-list="CITY_NAMES"
        @list-item-click="handleCityChoose(departureCity, $event)"
      />

      <LocationStep
        v-else-if="currentStep === StepNames.departureLocation"
        title="Укажите точный адрес отправления"
        :city="departureCity"
        :options="['Я заберу пассажиров с места']"
        @location-input="handleCityLocationChange(departureCity, $event)"
        @option-click="handleCityOptionChoose(departureCity)"
      />

      <CityStep
        v-else-if="currentStep === StepNames.destinationCity"
        title="Куда вы едете?"
        :city-name="destinationCity.city"
        :city-list="CITY_NAMES"
        @list-item-click="handleCityChoose(destinationCity, $event)"
      />

      <LocationStep
        v-else-if="currentStep === StepNames.destinationLocation"
        title="Укажите точный адрес прибытия"
        :city="destinationCity"
        :options="['Я довезу пассажиров до места']"
        @location-input="handleCityLocationChange(destinationCity, $event)"
        @option-click="handleCityOptionChoose(destinationCity)"
      />

      <IntermediateCitiesStep
        v-else-if="currentStep === StepNames.intermediateCities"
        :city-list="CITY_NAMES"
        v-model="intermediateCities"
      />

      <DateStep
        v-else-if="currentStep === StepNames.date"
        v-model="date"
        @update:model-value="currentStep++"
      />

      <TimeStep
        v-else-if="currentStep === StepNames.time"
        v-model="time"
      />

      <CarSelectionStep
        v-else-if="currentStep === StepNames.car"
        v-model="carId"
        @update:model-value="currentStep++"
      />

      <PassengersAmountStep
        v-else-if="currentStep === StepNames.passengersAmount"
        v-model="passengersAmount"
      />

      <TripConveniencesStep
        v-else-if="currentStep === StepNames.tripConveniences"
        v-model="tripConveniences"
      />

      <PriceStep
        v-else-if="currentStep === StepNames.price"
        v-model="price"
      />

      <CommentStep
        v-else-if="currentStep === StepNames.comment"
        v-model="comment"
      />
    </transition>

    <UiNextStepButton
      v-if="isNextButtonVisible"
      nav-menu-margin
      v-model="currentStep"
    />

    <UiPageButton
      v-else-if="currentStep === Object.values(StepNames).pop()"
      label="Опубликовать"
      nav-menu-margin
      @click="handlePublishBtnClick"
    />
  </q-page>
</template>
