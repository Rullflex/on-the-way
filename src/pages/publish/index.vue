<script setup lang="ts">
import { CITY_NAMES } from 'src/shared/constants';
import { MyBackBtn, MyItem } from 'src/shared/ui';
import { useStep } from 'src/shared/hooks/useStep';
import { usePublishSettingsStore } from 'stores/publish-settings';
import CityStep from './ui/CityStep.vue';
import LocationStep from './ui/LocationStep.vue';
import NextButton from './ui/NextButton.vue';

enum StepNames {
  departureCity,
  departureLocation,
  destinationCity,
  destinationLocation,
  intermediateCities,
  date,
  time,
}

const store = usePublishSettingsStore();
const { departureCity, destinationCity, intermediateCities, date, time } = storeToRefs(store);
const { currentStep, stepAnimationName } = useStep(StepNames.departureCity);
const isNextButtonVisible = computed<boolean>(() => {
  if (currentStep.value === StepNames.departureCity) {
    return Boolean(departureCity.value.city);
  } else if (currentStep.value === StepNames.departureLocation) {
    return Boolean(departureCity.value.location);
  } else if (currentStep.value === StepNames.destinationCity) {
    return Boolean(destinationCity.value.city);
  } else if (currentStep.value === StepNames.destinationLocation) {
    return Boolean(destinationCity.value.location);
  } else if (currentStep.value === StepNames.intermediateCities) {
    return Boolean(intermediateCities.value.length);
  }

  return false;
});
const hasIntermediateCity = (city: string) => intermediateCities.value.includes(city);
</script>

<template>
  <q-page>
    <!-- ANCHOR - Back Button -->
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
        @list-item-click="(name) => {
        currentStep++;
        departureCity.city = name;
        }"
      />

      <LocationStep
        v-else-if="currentStep === StepNames.departureLocation"
        title="Укажите точный адрес отправления"
        :city="departureCity"
        :options="['Я заберу пассажиров с места', 'Договорно']"
        @location-input="(value) => {
          departureCity.location = value
        }"
        @option-click="(option) => {
          departureCity.location = option
          currentStep++
        }"
      />

      <CityStep
        v-else-if="currentStep === StepNames.destinationCity"
        title="Куда вы едете?"
        :city-name="destinationCity.city"
        :city-list="CITY_NAMES"
        @list-item-click="(name) => {
          destinationCity.city = name;
          currentStep++;
        }"
      />

      <LocationStep
        v-else-if="currentStep === StepNames.destinationLocation"
        title="Укажите точный адрес прибытия"
        :city="destinationCity"
        :options="['Я довезу пассажиров до места', 'Договорно']"
        @location-input="(value) => {
          destinationCity.location = value
        }"
        @option-click="(option) => {
          destinationCity.location = option
          currentStep++
        }"
      />

      <div
        v-else-if="currentStep === StepNames.intermediateCities"
        class="q-pa-md absolute full-width"
      >
        <h5 class="q-mb-md">Добавьте промежуточные остановки, чтобы найти больше пассажиров</h5>

        <q-list>
          <my-item
            v-for="name in CITY_NAMES"
            :icon="hasIntermediateCity(name) ? 'eva-checkmark-square-2-outline' : 'eva-square-outline'"
            :key="name"
            :label="name"
            clickable
            @click="store.toggleIntermediateCity(name)"
          />
        </q-list>
      </div>

      <div
        v-else-if="currentStep === StepNames.date"
        class="q-pa-md absolute full-width"
      >
        <h4 class="q-mb-md">Когда поездка?</h4>

        <q-date
          v-model="date"
          flat
          minimal
          class="full-width"
          :options="
            (date) => {
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              return new Date(date) >= today;
            }
          "
          @update:model-value="currentStep++"
        ></q-date>
      </div>

      <div
        v-else-if="currentStep === StepNames.time"
        class="q-pa-md absolute full-width"
      >
        <h4 class="q-mb-md">Во сколько заберете пассажиров?</h4>

        <q-time
          flat
          now-btn
          class="full-width"
          v-model="time"
        />
      </div>
    </transition>

    <NextButton
      v-if="isNextButtonVisible"
      @btn-click="currentStep++"
    />
  </q-page>
</template>
