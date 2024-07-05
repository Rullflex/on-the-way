<script setup lang="ts">
const time = defineModel({ default: '' });
</script>

<template>
  <div
    class="absolute full-width"
  >
    <h4 class="q-ma-lg q-pb-sm">Во сколько заберете пассажиров?</h4>

    <q-input
      class="q-mx-lg"
      type="time"
      outlined
      v-model="time"
    />
  </div>
</template>



