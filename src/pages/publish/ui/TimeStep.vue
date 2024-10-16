<script setup lang="ts">
import StepContainer from 'pages/publish/ui/StepContainer.vue';

const time = defineModel({ default: '' });
</script>

<template>
  <StepContainer>
    <h4 class="q-ma-lg">Во сколько заберете пассажиров?</h4>

    <q-input
      type="time"
      outlined
      class="q-mx-lg q-pt-sm"
      v-model="time"
      :autofocus="!time"
    />
  </StepContainer>
</template>
