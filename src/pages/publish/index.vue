<script setup lang="ts">
import { CITY_NAMES } from 'src/shared/constants';
import { MyBackBtn } from 'src/shared/ui';
import { useStep } from 'src/shared/hooks/useStep';
import CityStep from './ui/CityStep.vue';
import LocationStep from './ui/LocationStep.vue';
import NextButton from './ui/NextButton.vue';
import IntermediateCitiesStep from './ui/IntermediateCitiesStep.vue';
import DateStep from './ui/DateStep.vue';
import TimeStep from 'pages/publish/ui/TimeStep.vue';
import TravelConveniencesStep from 'pages/publish/ui/TravelConveniencesStep.vue';
import { TravelConveniences } from 'src/shared/types/travelConveniencesTypes';
import PublishButton from 'pages/publish/ui/PublishButton.vue';
import PriceStep from 'pages/publish/ui/PriceStep.vue';

enum StepNames {
  departureCity,
  departureLocation,
  destinationCity,
  destinationLocation,
  intermediateCities,
  date,
  time,
  price,
  travelConveniences,
}

export interface ICityInfo {
  city: string,
  location: string,
  canDriveToPassengerLocation: boolean,
}

const initialCityState: ICityInfo = {
  city: '',
  location: '',
  canDriveToPassengerLocation: false
};

const departureCity = ref<ICityInfo>({ ...initialCityState });
const destinationCity = ref<ICityInfo>({ ...initialCityState });
const intermediateCities = ref<string[]>([]);
const date = ref('');
const time = ref('');
const price = ref('');
const travelConveniences = ref<TravelConveniences>({
  arePetsAllowed: false,
  hasAirConditioner: false,
  hasBaggageTransportation: false,
  hasChildSeat: false,
  hasPackageDelivery: false,
  isMaxTwoInTheBack: false
});
const { currentStep, stepAnimationName } = useStep(StepNames.departureCity);

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
    return Boolean(intermediateCities.value.length);
  } else if (currentStep.value === StepNames.date) {
    return Boolean(date.value);
  } else if (currentStep.value === StepNames.time) {
    return Boolean(time.value);
  } else if (currentStep.value === StepNames.price) {
    return Boolean(price.value);
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

</script>

<template>
  <q-page>
    <my-back-btn
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
      />

      <TimeStep
        v-else-if="currentStep === StepNames.time"
        v-model="time"
      />

      <PriceStep
        v-else-if="currentStep === StepNames.price"
        v-model="price"
      />

      <TravelConveniencesStep
        v-else-if="currentStep === StepNames.travelConveniences"
        v-model="travelConveniences"
      />

    </transition>

    <NextButton
      v-if="isNextButtonVisible"
      @btn-click="currentStep++"
    />

    <PublishButton
      v-else-if="currentStep === StepNames.travelConveniences"
    />
  </q-page>
</template>
