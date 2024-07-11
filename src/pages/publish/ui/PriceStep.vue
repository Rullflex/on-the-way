<script setup lang="ts">
import UiStepContainer from 'src/shared/ui/UiStepContainer.vue';

const price = defineModel({ default: '' });
</script>

<template>
  <UiStepContainer>
    <h4 class="q-ma-lg">Сколько будет стоить поездка для одного пассажира?</h4>

    <q-input
      type="number"
      placeholder="Введите цену в рублях"
      outlined
      class="q-mx-lg q-pt-sm"
      v-model="price"
    >
      <template v-slot:append>
        <q-icon name="currency_ruble" />
      </template>
    </q-input>
  </UiStepContainer>
</template>
