<script setup lang="ts">
import ChangeAvatarSection from './ui/ChangeAvatarSection.vue';
import ItemsList from './ui/ItemsList.vue';
import ProfileEditDialog from './ui/ProfileEditDialog.vue';
import { ItemType } from './types';

const isDialogVisible = ref(false);
const dialogType = ref<ItemType>(ItemType.name);

const showDialogByType = (type: ItemType) => {
  isDialogVisible.value = true;
  dialogType.value = type;
};
</script>

<template>
  <q-page class="q-px-sm">
    <h5 class="q-mb-lg q-mx-md">Редактирование профиля</h5>

    <ChangeAvatarSection />

    <ItemsList @item-click="showDialogByType" />
  </q-page>

  <ProfileEditDialog
    v-model:is-dialog-visible="isDialogVisible"
    v-model:type="dialogType"
  />
</template>

<route lang="yaml">
meta:
  layout: subPage
  fallbackRoute: '/profile'
</route>
