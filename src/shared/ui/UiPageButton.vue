<script setup lang="ts">
defineProps<{
  label: string
  navMenuMargin?: boolean
}>();
</script>

<template>
  <q-btn
    unelevated
    color="primary"
    class="fixed-bottom q-ma-lg"
    :class="{navMenuMargin: navMenuMargin}"
    :label="label"
  />
</template>

<style scoped>
.navMenuMargin {
  margin-bottom: 90px;
}
</style>

