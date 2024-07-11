<script setup lang="ts">
const comment = defineModel({ default: '' });
</script>

<template>
  <div>
    <h4 class="q-ma-lg">Добавьте комментарий к поездке</h4>
    <q-input
      type="textarea"
      outlined
      class="q-mx-lg q-pt-sm"
      v-model="comment"
    />
  </div>
</template>


