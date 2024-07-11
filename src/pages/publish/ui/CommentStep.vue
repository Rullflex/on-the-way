<script setup lang="ts">
import UiStepContainer from 'src/shared/ui/UiStepContainer.vue';

const comment = defineModel({ default: '' });
</script>

<template>
  <UiStepContainer>
    <h4 class="q-ma-lg">Добавьте комментарий к поездке</h4>
    <q-input
      type="textarea"
      outlined
      class="q-mx-lg q-pt-sm"
      v-model="comment"
    />
  </UiStepContainer>
</template>


