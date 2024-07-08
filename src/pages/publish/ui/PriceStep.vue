<script setup lang="ts">
const price = defineModel({ default: '' });
</script>

<template>
  <div
    class="absolute full-width"
  >
    <h4 class="q-ma-lg">Сколько будет стоить поездка для одного пассажира?</h4>

    <q-input
      type="number"
      placeholder="500"
      outlined
      class="q-mx-lg q-pt-sm"
      v-model="price"
    >
      <template v-slot:append>
        <q-icon name="currency_ruble"/>
      </template>
    </q-input>
  </div>
</template>


