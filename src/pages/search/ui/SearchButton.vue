<script setup lang='ts'>
const emit = defineEmits(['click']);
</script>

<template>
  <div class="q-pa-lg">
    <q-btn
      unelevated
      color="primary"
      class="full-width"
      @click="emit('click')"
    >
      Поиск
    </q-btn>
  </div>
</template>
