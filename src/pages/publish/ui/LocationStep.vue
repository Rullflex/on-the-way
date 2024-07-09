<script setup lang="ts">
import { MyItem } from 'src/shared/ui';
import { ICityInfo } from 'pages/publish/index.vue';
import StepContainer from 'pages/publish/ui/StepContainer.vue';

const props = defineProps<{
  title: string,
  city: ICityInfo,
  options: string[]
}>();

const locationInputValue = ref(props.city.location);
</script>

<template>
  <StepContainer>
    <h4 class="q-mx-lg q-mt-md q-mb-lg">{{ title }}</h4>

    <q-input
      class="q-mx-lg q-pb-sm"
      v-model="locationInputValue"
      @update:model-value="$emit('locationInput', locationInputValue)"
      outlined
      maxlength="20"
      :prefix="`${city.city},`"
      placeholder="Ленина 24"
    />

    <my-item
      class="q-mx-sm"
      v-for="option in options"
      :key="option"
      :label="option"
      :active="city.canDriveToPassengerLocation"
      chevron
      clickable
      @click="$emit('optionClick')"
    />
  </StepContainer>
</template>
