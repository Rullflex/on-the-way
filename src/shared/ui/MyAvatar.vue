<script setup lang="ts">
import { computed } from 'vue';
import { useUserInfoStore } from 'src/stores/user-info';

const userInfoStore = useUserInfoStore();
const avatar = computed(() => userInfoStore.avatar);
</script>

<template>
  <q-avatar
    color="grey-4"
    text-color="white"
    size="5rem"
  >
    <q-img
      v-if="avatar"
      :src="avatar"
    />
    <q-icon
      v-else
      name="eva-person"
    />
  </q-avatar>
</template>
