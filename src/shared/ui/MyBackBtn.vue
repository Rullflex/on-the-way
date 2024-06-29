<script setup lang="ts">
import { computed } from 'vue';
import { RouteLocationRaw } from 'vue-router';

const props = defineProps<{
  fallbackRoute: RouteLocationRaw;
}>();
const backRoute = computed(() => history.state.back ?? props.fallbackRoute);
</script>

<template>
  <q-btn
    flat
    dense
    icon="eva-arrow-back-outline"
    :to="backRoute"
  />
</template>
