<script setup lang="ts">
import { TRIP_CONVENIENCES } from 'src/shared/constants';
import { TripConveniencesNames } from 'src/shared/enums';
import { MyItem } from 'src/shared/ui';
import UiStepContainer from 'src/shared/ui/UiStepContainer.vue';

const tripConveniences = defineModel<TripConveniencesNames[]>({ default: [] });

const toggleConvenience = (name: TripConveniencesNames) => {
  if (tripConveniences.value.includes(name)) {
    tripConveniences.value = tripConveniences.value.filter((convenience) => convenience !== name);
  } else {
    tripConveniences.value = [...tripConveniences.value, name];
  }
};
</script>

<template>
  <UiStepContainer>
    <h4 class="q-ma-lg">Выберите удобства, доступные пассажирам</h4>

    <q-list class="q-px-sm">
      <my-item
        v-for="convenience in TRIP_CONVENIENCES"
        :key="convenience.name"
        :label="convenience.title"
        :icon="tripConveniences.includes(convenience.name) ? 'eva-checkmark-square-2-outline' : 'eva-square-outline'"
        clickable
        @click="toggleConvenience(convenience.name)"
      >
        <template v-slot:append>
          <q-item-section side>
            <q-icon :name="convenience.icon" />
          </q-item-section>
        </template>
      </my-item>
    </q-list>
  </UiStepContainer>
</template>
