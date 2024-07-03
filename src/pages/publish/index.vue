<script setup lang="ts">
import { CITY_NAMES } from 'src/shared/constants';
import { MyBackBtn, MyItem } from 'src/shared/ui';
import { useStep } from 'src/shared/hooks/useStep';
import { usePublishSettingsStore } from 'stores/publish-settings';

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
      <!-- SECTION - Step Departure City -->
      <div
        v-if="currentStep === StepNames.departureCity"
        class="absolute full-width"
      >
        <h4 class="q-ma-lg">Откуда вы выезжаете?</h4>

        <q-list class="q-px-sm">
          <my-item
            v-for="name in CITY_NAMES"
            :key="name"
            :label="name"
            chevron
            clickable
            @click="
              departureCity.city = name;
              currentStep++;
            "
          />
        </q-list>
      </div>
      <!-- !SECTION -->

      <!-- SECTION - Step Departure Location -->
      <div
        v-else-if="currentStep === StepNames.departureLocation"
        class="q-pa-lg absolute full-width"
      >
        <h4 class="q-mb-lg">Укажите точный адрес отправления</h4>

        <q-input
          v-model="departureCity.location"
          outlined
          maxlength="20"
          :prefix="`${departureCity.city},`"
          placeholder="Ленина 24"
        />

        <my-item
          label="Я заберу пассажиров с места"
          chevron
          clickable
          @click="currentStep++"
        />

        <my-item
          label="Договорно"
          chevron
          clickable
          @click="currentStep++"
        />
      </div>
      <!-- !SECTION -->

      <!-- SECTION - Step Destination City -->
      <div
        v-else-if="currentStep === StepNames.destinationCity"
        class="q-pa-md absolute full-width"
      >
        <h4 class="q-mb-md">Куда вы едете?</h4>

        <q-list>
          <my-item
            v-for="name in CITY_NAMES"
            :key="name"
            :label="name"
            chevron
            clickable
            @click="
              destinationCity.city = name;
              currentStep++;
            "
          />
        </q-list>
      </div>
      <!-- !SECTION -->

      <!-- SECTION - Step Destination Location -->
      <div
        v-else-if="currentStep === StepNames.destinationLocation"
        class="q-pa-lg absolute full-width"
      >
        <h4 class="q-mb-lg">Укажите точный адрес прибытия</h4>

        <q-input
          v-model="destinationCity.location"
          outlined
          maxlength="20"
          :prefix="`${destinationCity.city},`"
          placeholder="Ленина 24"
        />

        <my-item
          label="Я довезу пассажиров до места"
          chevron
          clickable
          @click="currentStep++"
        />

        <my-item
          label="Договорно"
          chevron
          clickable
          @click="currentStep++"
        />
      </div>
      <!-- !SECTION -->

      <!-- SECTION - Step Intermediate Cities -->
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
      <!-- !SECTION -->

      <!-- SECTION - Step Date -->
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
      <!-- !SECTION -->

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

    <!-- ANCHOR - Next Button -->
    <q-page-sticky
      position="bottom-right"
      :offset="[18, 18]"
    >
      <q-btn
        fab
        icon="eva-arrow-forward-outline"
        color="primary"
        @click="currentStep++"
      />
    </q-page-sticky>
  </q-page>
</template>
