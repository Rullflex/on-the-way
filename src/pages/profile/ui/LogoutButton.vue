<script setup lang="ts">
import { MyItem } from 'src/shared/ui';
import { account } from 'src/plugins/appwrite';
import { useUserStore } from 'stores/user';

const userStore = useUserStore();
const router = useRouter();

const logout = async () => {
  await account.deleteSession('current');
  userStore.$reset();
  await router.push('/login');
};
</script>

<template>
  <my-item
    clickable
    color="negative"
    label="Выйти"
    @click="logout"
  />
</template>
