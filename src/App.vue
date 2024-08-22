<template>
  <router-view />
</template>

<script setup lang="ts">
import { Loading, QSpinnerPuff } from 'quasar';

Loading.setDefaults({
  spinner: QSpinnerPuff,
  spinnerColor: 'primary',
  backgroundColor: 'grey-3',
});

onMounted(() => {
  document.body.classList.remove('app-loading');
});
</script>
