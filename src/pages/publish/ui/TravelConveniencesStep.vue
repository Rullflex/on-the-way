<script setup lang="ts">
import { TRAVEL_CONVENIENCES } from 'src/shared/constants';
import { TravelConveniences } from 'src/shared/types/travelConveniencesTypes';
import { MyItem } from 'src/shared/ui';
import StepContainer from 'pages/publish/ui/StepContainer.vue';

const travelConveniences = defineModel({
  default: {
    arePetsAllowed: false,
    hasAirConditioner: false,
    hasBaggageTransportation: false,
    hasChildSeat: false,
    hasPackageDelivery: false,
    isMaxTwoInTheBack: false
  }
});
const toggleConvenience = (name: keyof TravelConveniences) => {
  travelConveniences.value = { ...travelConveniences.value, [name]: !travelConveniences.value[name] };
};
</script>

<template>
  <StepContainer>
    <h4 class="q-ma-lg">Выберите удобства, доступные пассажирам</h4>
    <q-list class="q-px-sm">
      <my-item
        v-for="convenience in TRAVEL_CONVENIENCES"
        :key="convenience.name"
        :label="convenience.title"
        :icon="travelConveniences[convenience.name as keyof TravelConveniences] ? 'eva-checkmark-square-2-outline' : 'eva-square-outline'"
        clickable
        @click="toggleConvenience(convenience.name as keyof TravelConveniences)"
      >
        <template v-slot:append>
          <q-item-section side>
            <q-icon :name="convenience.icon" />
          </q-item-section>
        </template>
      </my-item>
    </q-list>
  </StepContainer>
</template>


