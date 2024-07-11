<script setup lang="ts">
import UiStepContainer from 'src/shared/ui/UiStepContainer.vue';

const time = defineModel({ default: '' });
</script>

<template>
  <UiStepContainer>
    <h4 class="q-ma-lg">Во сколько заберете пассажиров?</h4>

    <q-input
      type="time"
      outlined
      class="q-mx-lg q-pt-sm"
      v-model="time"
    />
  </UiStepContainer>
</template>



