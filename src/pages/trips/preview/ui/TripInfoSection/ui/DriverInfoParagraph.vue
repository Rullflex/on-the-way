<script setup lang="ts">
import { getAvatarURL, Response } from 'src/shared/api';
import { MyAvatar, MyItem } from 'src/shared/ui';
import { IUser } from 'src/shared/types';

defineProps<{
  driver: Response<IUser>;
  comment?: string;
}>();
</script>

<template>
  <my-item
    chevron
    :label="driver.name"
    :to="`/profile/preview/${driver.$id}`"
  >
    <template #append>
      <my-avatar :src="driver.avatarFileId ? getAvatarURL(driver.avatarFileId) : ''" />
    </template>
  </my-item>

  <q-item v-if="comment">
    <q-item-section>
      <q-item-label caption>Комментарий</q-item-label>
      <q-item-label>{{ comment }}</q-item-label>
    </q-item-section>
  </q-item>
</template>
