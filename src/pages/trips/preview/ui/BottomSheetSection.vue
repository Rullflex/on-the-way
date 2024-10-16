<script setup lang="ts">
import MyItem from 'src/shared/ui/MyItem.vue';
</script>

<template>
  <q-list class="q-px-sm">
    <my-item
      clickable
      color="primary"
      icon="eva-share-outline"
      label="Поделиться поездкой"
      @click="$emit('share')"
    />
  </q-list>
</template>
