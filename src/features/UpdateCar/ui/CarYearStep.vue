<script setup lang="ts">
const year = defineModel({ default: '' });
</script>

<template>
  <div>
    <h4 class="q-ma-lg">Какого года выпуска ваша машина?</h4>

    <q-input
      v-model="year"
      :autofocus="!year"
      outlined
      clearable
      inputmode="numeric"
      class="q-mx-lg q-pt-sm"
      :rules="[
            (val) =>
              (val?.length === 4 && Number(val) <= new Date().getFullYear()) || 'Введите год в правильном формате',
          ]"
      placeholder="2000"
    />
  </div>
</template>
