<script lang="ts" setup>
defineOptions({
  name: 'AboutPage',
});
</script>

<template>
  <q-page padding>
    <h4 class="q-px-md q-mb-sm">О нас</h4>

    <p class="q-pa-md">Тут будет информация о нас</p>
  </q-page>
</template>

<route lang="yaml">
meta:
  layout: subPage
  fallbackRoute: '/profile'
</route>
