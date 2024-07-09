<script setup lang="ts">
import StepContainer from 'pages/publish/ui/StepContainer.vue';

const comment = defineModel({ default: '' });
</script>

<template>
  <StepContainer>
    <h4 class="q-mx-lg q-my-md">Добавьте комментарий к поездке</h4>
    <q-input
      type="textarea"
      outlined
      class="q-mx-lg q-pt-sm"
      v-model="comment"
    />
  </StepContainer>
</template>


