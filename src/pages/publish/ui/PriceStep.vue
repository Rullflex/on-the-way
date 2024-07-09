<script setup lang="ts">
import StepContainer from 'pages/publish/ui/StepContainer.vue';

const price = defineModel({ default: '' });
</script>

<template>
  <StepContainer>
    <h4 class="q-ma-lg">Сколько будет стоить поездка для одного пассажира?</h4>

    <q-input
      type="number"
      placeholder="XXX"
      outlined
      class="q-mx-lg q-pt-sm"
      v-model="price"
    >
      <template v-slot:append>
        <q-icon name="currency_ruble"/>
      </template>
    </q-input>
  </StepContainer>
</template>


