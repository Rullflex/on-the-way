<script setup lang="ts">
import { useUserStore } from 'src/stores/user';

interface IProps {
  src?: string;
  size?: string;
}

const props = withDefaults(defineProps<IProps>(), {
  size: '2.5rem',
});
const userStore = useUserStore();
const src = computed(() => props.src ?? userStore.avatarURL);
</script>

<template>
  <q-avatar
    color="grey-4"
    text-color="white"
    :size="props.size"
  >
    <q-img
      v-if="src"
      :src="src"
    />
    <q-icon
      v-else
      name="eva-person"
    />
  </q-avatar>
</template>
