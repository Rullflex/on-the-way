<script setup lang="ts">
const props = defineProps<{
  time: string
}>();

const time = ref(props.time);
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
      @update:model-value="$emit('timeUpdate', time)"
    />
  </div>
</template>



