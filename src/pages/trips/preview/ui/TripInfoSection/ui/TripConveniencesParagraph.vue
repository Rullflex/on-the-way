<script setup lang="ts">
import MyItem from 'src/shared/ui/MyItem.vue';
import { TRIP_CONVENIENCES } from 'src/shared/constants';

const props = defineProps<{
  conveniences: string[];
}>();

const tripConveniences = computed(() => {
  return props.conveniences.map((name) => TRIP_CONVENIENCES.find((item) => item.name === name)!) ?? [];
});
</script>

<template>
  <my-item
    v-for="convenience in tripConveniences"
    :key="convenience?.name"
    :icon="convenience?.icon"
    :label="convenience?.title"
  />
</template>
