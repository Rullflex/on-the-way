<script setup lang="ts">
const time = defineModel({ default: '' });
</script>

<template>
  <div
    class="q-pa-md absolute full-width"
  >
    <h4 class="q-mb-md">Во сколько заберете пассажиров?</h4>

    <q-time
      flat
      now-btn
      class="full-width"
      v-model="time"
    />
  </div>
</template>



