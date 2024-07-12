<script setup lang="ts">
import { MyAvatar, MyItem } from 'src/shared/ui';
import { useUserStore } from 'stores/user';

const userStore = useUserStore();
</script>

<template>
  <q-item
    class="rounded-borders"
    :to="`/profile/preview/${userStore.accountId}`"
  >
    <q-item-section>
      <q-item-label class="text-h5 text-blue-grey-9">{{ userStore.name }}</q-item-label>
      <q-item-label caption>Личные данные</q-item-label>
    </q-item-section>

    <q-item-section avatar>
      <my-avatar size="5rem" />
    </q-item-section>

    <q-item-section side>
      <q-icon name="eva-chevron-right-outline"></q-icon>
    </q-item-section>
  </q-item>

  <my-item
    color="primary"
    to="/profile/edit"
    icon="eva-edit-outline"
    label="Редактировать профиль"
  />
</template>
