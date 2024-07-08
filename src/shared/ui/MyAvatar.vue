<script setup lang="ts">
import { useUserInfoStore } from 'src/stores/user-info';

interface IProps {
  src?: string;
  size?: string;
}

const props = withDefaults(defineProps<IProps>(), {
  size: '2.5rem',
});
const userInfoStore = useUserInfoStore();
const src = computed(() => props.src ?? userInfoStore.avatarURL);
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
