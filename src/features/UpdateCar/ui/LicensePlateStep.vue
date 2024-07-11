<script setup lang="ts">
import { MyItem } from 'src/shared/ui';
import UiStepContainer from 'src/shared/ui/UiStepContainer.vue';

const licensePlate = defineModel<string | null>({ default: '' });
const emit = defineEmits(['optionClick']);
</script>

<template>
  <UiStepContainer>
    <h4 class="q-ma-lg">Какой у машины регистрационный номер?</h4>

    <q-input
      v-model="licensePlate"
      outlined
      maxlength="20"
      placeholder="А 123 БВ 45"
      class="q-mx-lg q-py-sm"
    />

    <my-item
      v-show="!licensePlate?.length"
      chevron
      clickable
      label="Я не знаю номер"
      class="q-mx-sm"
      :active="licensePlate === null"
      @click="emit('optionClick')"
    />
  </UiStepContainer>
</template>
