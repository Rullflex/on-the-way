<script setup lang="ts">
import StepContainer from 'pages/publish/ui/StepContainer.vue';

const time = defineModel({ default: '' });
</script>

<template>
  <StepContainer>
    <h4 class="q-mx-lg q-my-md">Во сколько заберете пассажиров?</h4>

    <q-input
      type="time"
      outlined
      class="q-mx-lg q-pt-sm"
      v-model="time"
    />
  </StepContainer>
</template>



