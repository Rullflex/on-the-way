<template>
  <router-view />
</template>

<script setup lang="ts">
onMounted(() => {
  document.body.classList.remove('app-loading');
});
</script>
