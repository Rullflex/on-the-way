<script setup lang="ts">
import { MyBackBtn } from 'src/shared/ui';

defineOptions({
  name: 'SubPageLayout',
});
</script>

<template>
  <q-layout>
    <q-header
      reveal
      class="bg-white text-blue-grey-8 q-pa-md"
    >
      <my-back-btn fallback-route="/search" />
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
