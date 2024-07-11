<script setup lang="ts">
import { MyBackBtn } from 'src/shared/ui';

defineOptions({
  name: 'SubPageLayout',
});

const router = useRouter();
const fallbackRoute = computed(() => router.currentRoute.value.meta.fallbackRoute as string | undefined);
</script>

<template>
  <q-layout>
    <q-header
      reveal
      class="bg-white text-blue-grey-8 q-pa-md"
    >
      <my-back-btn :fallback-route="fallbackRoute ?? '/search'" />
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
