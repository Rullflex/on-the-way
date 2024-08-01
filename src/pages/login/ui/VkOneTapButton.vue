<script setup lang="ts">
import VKID from 'src/plugins/vkid';

const rootEl = ref<HTMLDivElement | null>(null);

onMounted(() => {
  if (rootEl.value) {
    const oneTap = new VKID.OneTap();
    oneTap.render({
      container: rootEl.value,
      styles: {
        borderRadius: 12,
      },
    });
  }
});
</script>

<template>
  <div
    ref="rootEl"
    style="display: contents"
  ></div>
</template>
