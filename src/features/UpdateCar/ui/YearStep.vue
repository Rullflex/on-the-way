<script setup lang="ts">
import UiStepContainer from 'src/shared/ui/UiStepContainer.vue';

const year = defineModel({ default: '' });
</script>

<template>
  <UiStepContainer>
    <h4 class="q-ma-lg">Какого года выпуска ваша машина?</h4>

    <q-input
      v-model="year"
      outlined
      clearable
      inputmode="numeric"
      class="q-mx-lg q-pt-sm"
      :rules="[
            (val) =>
              (val?.length === 4 && Number(val) <= new Date().getFullYear()) || 'Введите год в правильном формате',
          ]"
      placeholder="2000"
    />
  </UiStepContainer>
</template>
