<script setup lang="ts">
const currentStep = defineModel({ default: 0 });
defineProps<{
  navMenuMargin?: boolean
}>();
</script>

<template>
  <q-btn
    fab
    icon="eva-arrow-forward-outline"
    color="primary"
    class="z-max fixed-bottom-right button"
    :class="{navMenuMargin: navMenuMargin}"
    @click=currentStep++
  />
</template>

<style scoped>
.button {
  margin: 18px;
}

.navMenuMargin {
  margin-bottom: 84px;
}
</style>
