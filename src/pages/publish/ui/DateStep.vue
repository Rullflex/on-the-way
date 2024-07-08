<script setup lang="ts">
import StepContainer from 'pages/publish/ui/StepContainer.vue';

const date = defineModel({ default: '' });
</script>

<template>
  <StepContainer>
    <h4 class="q-ma-lg">Когда поездка?</h4>

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
    ></q-date>
  </StepContainer>
</template>
