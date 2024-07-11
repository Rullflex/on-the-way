<script setup lang="ts">
const name = defineModel({ default: '' });
</script>

<template>
  <div>
    <h4 class="q-ma-lg">Какая у вас марка и модель машины?</h4>

    <q-input
      v-model="name"
      :autofocus="!Boolean(name)"
      outlined
      clearable
      maxlength="20"
      placeholder="HYNDAI SOLARIS"
      class="q-pt-sm q-mx-lg"
    />
  </div>
</template>
