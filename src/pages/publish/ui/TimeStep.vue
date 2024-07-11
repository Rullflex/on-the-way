<script setup lang="ts">
const time = defineModel({ default: '' });
</script>

<template>
  <div>
    <h4 class="q-ma-lg">Во сколько заберете пассажиров?</h4>

    <q-input
      type="time"
      outlined
      class="q-mx-lg q-pt-sm"
      v-model="time"
    />
  </div>
</template>



