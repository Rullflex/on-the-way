<script setup lang="ts">
import MyItem from 'src/shared/ui/MyItem.vue';
</script>

<template>
  <q-list class="q-px-sm">
    <my-item
      color="primary"
      label="Поделиться поездкой"
    />

    <my-item
      color="primary"
      label="Пожаловаться на поездку"
    />
  </q-list>
</template>
