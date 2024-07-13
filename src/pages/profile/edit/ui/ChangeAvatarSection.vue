<script setup lang="ts">
import { MyAvatar, MyItem } from 'src/shared/ui';
import { Loading } from 'quasar';
import { AppwriteException, updateUser, uploadAvatar } from 'src/shared/api';
import { captureApiException } from 'src/shared/utils';
import { useUserStore } from 'stores/user';

const userStore = useUserStore();
const { avatarFileId } = storeToRefs(userStore);

const handleAvatarChange = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (!target.files) {
    return;
  }

  Loading.show();
  try {
    const response = await uploadAvatar(target.files[0]);
    await updateUser(userStore.accountId, { avatarFileId: response.$id });
    avatarFileId.value = response.$id;
  } catch (error) {
    captureApiException(error as AppwriteException);
  } finally {
    Loading.hide();
  }
};
</script>

<template>
  <my-item
    tag="label"
    color="primary"
    :icon="avatarFileId ? 'eva-edit-outline' : 'eva-plus-circle-outline'"
    :label="`${avatarFileId ? 'Изменить' : 'Добавить'} фото профиля`"
    class="cursor-pointer"
  >
    <template #append>
      <q-item-section avatar>
        <my-avatar size="5rem" />
      </q-item-section>
    </template>

    <input
      hidden
      type="file"
      accept="image/*"
      @input="handleAvatarChange"
    />
  </my-item>
</template>
