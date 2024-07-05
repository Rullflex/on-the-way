<script setup lang="ts">
const date = defineModel({ default: '' });
</script>

<template>
  <div
    class="q-pa-md absolute full-width"
  >
    <h4 class="q-mb-md">Когда поездка?</h4>

    <q-date
      v-model="date"
      flat
      minimal
      class="full-width"
      :options="
            (date) => {
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              return new Date(date) >= today;
            }
          "
    ></q-date>
  </div>
</template>
