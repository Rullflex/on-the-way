<script setup lang="ts">
import { computed } from 'vue';
import { RouteLocationRaw } from 'vue-router';

interface IProps {
  fallbackRoute?: RouteLocationRaw;
}

const props = defineProps<IProps>();
const backRoute = computed(() => history.state.back ?? props.fallbackRoute);
</script>

<template>
  <q-btn
    flat
    dense
    icon="eva-arrow-back-outline"
    :to="fallbackRoute && backRoute"
  />
</template>
