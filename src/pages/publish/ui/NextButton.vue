<script setup lang="ts">

</script>

<template>
  <q-page-sticky
    position="bottom-right"
    :offset="[18, 18]"
  >
    <q-btn
      fab
      icon="eva-arrow-forward-outline"
      color="primary"
      @click="$emit('btnClick')"
    />
  </q-page-sticky>
</template>
