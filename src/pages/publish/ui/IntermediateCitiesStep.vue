<script setup lang="ts">
import { MyItem } from 'src/shared/ui';
import StepContainer from 'pages/publish/ui/StepContainer.vue';

defineProps<{
  cityList: string[];
}>();

const intermediateCities = defineModel<string[]>({ default: [] });

const toggleIntermediateCity = (city: string) => {
  if (intermediateCities.value.includes(city)) {
    intermediateCities.value = intermediateCities.value.filter((item) => item !== city);
  } else {
    intermediateCities.value.push(city);
  }
};

const hasIntermediateCity = (city: string) => intermediateCities.value.includes(city);
</script>

<template>
  <StepContainer>
    <h5 class="q-ma-lg">Добавьте промежуточные остановки, чтобы найти больше пассажиров</h5>

    <q-list class="q-mx-sm">
      <my-item
        v-for="name in cityList"
        :icon="hasIntermediateCity(name) ? 'eva-checkmark-square-2-outline' : 'eva-square-outline'"
        :key="name"
        :label="name"
        clickable
        @click="toggleIntermediateCity(name)"
      />
    </q-list>
  </StepContainer>
</template>
