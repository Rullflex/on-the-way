<script setup lang="ts">
import { CITY_NAMES, TripStatus } from 'src/shared/constants';
import { MyBackBtn } from 'src/shared/ui';
import { useStep } from 'src/shared/hooks/useStep';
import CityStep from './ui/CityStep.vue';
import LocationStep from './ui/LocationStep.vue';
import NextButton from './ui/NextButton.vue';
import IntermediateCitiesStep from './ui/IntermediateCitiesStep.vue';
import DateStep from './ui/DateStep.vue';
import TimeStep from 'pages/publish/ui/TimeStep.vue';
import TripConveniencesStep from 'pages/publish/ui/TripConveniencesStep.vue';
import { TripConveniencesNames } from 'src/shared/enums';
import PublishButton from 'pages/publish/ui/PublishButton.vue';
import PriceStep from 'pages/publish/ui/PriceStep.vue';
import CarSelectionStep from 'pages/publish/ui/CarSelectionStep.vue';
import CommentStep from 'pages/publish/ui/CommentStep.vue';
import PassengersAmountStep from 'pages/publish/ui/PassengersAmountStep.vue';
import { createTrip, Response } from 'src/shared/api';
import { useUserStore } from 'stores/user';
import { captureApiException } from 'src/shared/utils';
import { AppwriteException } from 'appwrite';
import HistoryTemplatesStep from './ui/HistoryTemplatesStep.vue';
import { getDriverTrips } from './api';
import { ITrip } from 'src/shared/types';

defineOptions({
  name: 'PublishPage',
});

enum StepNames {
  history,
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
  canDriveToPassengerLocation: false,
};

const userStore = useUserStore();

const $q = useQuasar();

const departureCity = ref<ICityInfo>({ ...initialCityState });
const destinationCity = ref<ICityInfo>({ ...initialCityState });
const intermediateCities = ref<string[]>([]);
const date = ref('');
const time = ref('');
const price = ref('');
const carId = ref(userStore.cars[0].$id);
const passengersAmount = ref(4);
const tripConveniences = shallowRef<TripConveniencesNames[]>([]);
const { currentStep, stepAnimationName } = useStep(StepNames.history);
const comment = ref('');
const driverTrips = ref<Response<ITrip>[]>();

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

watch(currentStep, (nextStep, prevStep) => {
  // пропуск шага выбора авто если у пользователя только одна машина
  if (nextStep === StepNames.car && userStore.cars.length === 1) {
    nextStep > prevStep ? currentStep.value++ : currentStep.value--;
  }
});

const handleCreateFromHistory = (trip: Response<ITrip>) => {
  departureCity.value = {
    canDriveToPassengerLocation: trip.canPickUpFromPlace,
    location: trip.departureAddress,
    city: trip.departureCity,
  };

  destinationCity.value = {
    canDriveToPassengerLocation: trip.canDriveToPlace,
    location: trip.arrivalAddress,
    city: trip.arrivalCity,
  };

  price.value = String(trip.price);
  tripConveniences.value = [...trip.conveniences];
  intermediateCities.value = [...trip.intermediateCities];
  passengersAmount.value = trip.totalPassengers;
  comment.value = trip.comment;

  currentStep.value = StepNames.date;
};

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

const departureCityList = computed(() => {
  return CITY_NAMES.filter((city) => city !== destinationCity.value.city && !intermediateCities.value.includes(city));
});

const destinationCityList = computed(() => {
  return CITY_NAMES.filter((city) => city !== departureCity.value.city && !intermediateCities.value.includes(city));
});

const intermediateCityList = computed(() => {
  return CITY_NAMES.filter((city) => city !== departureCity.value.city && city !== destinationCity.value.city);
});

const router = useRouter();
const handlePublishBtnClick = async () => {
  $q.loading.show();

  const tripData: Parameters<typeof createTrip>[0] = {
    status: TripStatus.NEW,
    price: parseInt(price.value),
    departureDate: date.value,
    departureTime: time.value,
    totalPassengers: passengersAmount.value,
    conveniences: tripConveniences.value,
    departureCity: departureCity.value.city,
    arrivalCity: destinationCity.value.city,
    departureAddress: departureCity.value.location,
    arrivalAddress: destinationCity.value.location,
    intermediateCities: intermediateCities.value,
    canPickUpFromPlace: departureCity.value.canDriveToPassengerLocation,
    canDriveToPlace: destinationCity.value.canDriveToPassengerLocation,
    driver: userStore.accountId,
    // Передаем отдельно id так как appwrite еще не умеет работать с параметрами вложенных сущностей
    driverId: userStore.accountId,
    passengerIds: [],
    comment: comment.value,
    car: carId.value,
  };
  try {
    await createTrip(tripData);
    $q.notify({
      message: 'Поездка успешно опубликована',
      position: 'top',
      color: 'positive',
    });
    await router.push({ path: '/rides' });
  } catch (error) {
    captureApiException(error as AppwriteException);
  } finally {
    $q.loading.hide();
  }
};

$q.loading.show();
getDriverTrips(userStore.accountId, 4)
  .then((res) => {
    if (res.total === 0) {
      currentStep.value = StepNames.departureCity;
    }
    driverTrips.value = res.documents;
  })
  .catch(captureApiException)
  .finally($q.loading.hide);
</script>

<template>
  <q-page v-if="driverTrips">
    <my-back-btn
      v-if="currentStep > (driverTrips.length ? 0 : 1)"
      class="q-ml-md q-mt-md"
      @click="currentStep--"
    />

    <transition :name="stepAnimationName">
      <HistoryTemplatesStep
        v-if="currentStep === StepNames.history"
        :driver-trips="driverTrips"
        @create-new="currentStep++"
        @create-history="handleCreateFromHistory"
      />

      <CityStep
        v-else-if="currentStep === StepNames.departureCity"
        title="Откуда вы выезжаете?"
        :city-name="departureCity.city"
        :city-list="departureCityList"
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
        :city-list="destinationCityList"
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
        :city-list="intermediateCityList"
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

    <NextButton
      v-if="isNextButtonVisible"
      @btn-click="currentStep++"
    />

    <PublishButton
      v-else-if="currentStep === Object.values(StepNames).pop()"
      @click="handlePublishBtnClick"
    />
  </q-page>
</template>
