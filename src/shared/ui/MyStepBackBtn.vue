<script setup lang="ts">
const currentStep = defineModel({ default: 0, required: true });
</script>

<template>
  <q-btn
    flat
    dense
    icon="eva-arrow-back-outline"
    @click="currentStep--"
  />
</template>
