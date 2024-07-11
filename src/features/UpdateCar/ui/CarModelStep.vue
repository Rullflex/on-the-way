<script setup lang="ts">
import UiStepContainer from 'src/shared/ui/UiStepContainer.vue';

const name = defineModel({ default: '' });
</script>

<template>
  <UiStepContainer>
    <h4 class="q-ma-lg">Какая у вас марка и модель машины?</h4>

    <q-input
      v-model="name"
      outlined
      clearable
      maxlength="20"
      placeholder="HYNDAI SOLARIS"
      class="q-pt-sm q-mx-lg"
    />
  </UiStepContainer>
</template>
