<script setup lang="ts">
import StepContainer from 'pages/publish/ui/StepContainer.vue';

const passengersAmount = defineModel({ default: 4 });
</script>

<template>
  <StepContainer>
    <h4 class="q-mx-lg q-my-md">Сколько пассажиров вы планируете взять в поездку?</h4>

    <div class="column items-center gap-lg">
      <div class="row items-center">
        <q-btn
          flat
          dense
          icon="eva-minus-circle-outline"
          :disable="passengersAmount <= 1"
          @click="passengersAmount--"
        />

        <div
          class="text-h1 text-bold q-px-md row flex-center"
          style="width: 100px"
        >
          {{ passengersAmount }}
        </div>

        <q-btn
          flat
          dense
          icon="eva-plus-circle-outline"
          @click="passengersAmount++"
        />
      </div>
    </div>
  </StepContainer>
</template>
