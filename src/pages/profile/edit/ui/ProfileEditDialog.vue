<script setup lang="ts">
import { Loading } from 'quasar';
import { updateUser } from 'src/shared/api';
import { captureApiException } from 'src/shared/utils';
import { useUserStore } from 'stores/user';
import { MyPhoneInput } from 'src/shared/ui';
import { ItemType } from '../types';

const userStore = useUserStore();

const isDialogVisible = defineModel('isDialogVisible', { default: false });
const dialogType = defineModel<ItemType>('type', { default: ItemType.name });
const dialogModel = ref<string>(userStore[dialogType.value] as string);

watch(dialogType, () => {
  dialogModel.value = userStore[dialogType.value] ?? '';
});

const dialogTitle = computed(() => {
  switch (dialogType.value) {
    case ItemType.name:
      return 'Как вас зовут?';
    case ItemType.surname:
      return 'Какая у вас фамилия?';
    case ItemType.dateOfBirth:
      return 'Когда вы родились?';
    case ItemType.email:
      return 'Введите эл. почту';
    case ItemType.phone:
      return 'Подтвердите номер телефона';
    default:
      return '';
  }
});

const handleSave = async () => {
  if (dialogModel.value === userStore[dialogType.value]) {
    isDialogVisible.value = false;
    return;
  }
  Loading.show();
  await updateUser(userStore.accountId, { [dialogType.value as string]: dialogModel.value })
    .then(() => userStore.$patch({ [dialogType.value as string]: dialogModel.value }))
    .catch(captureApiException);
  Loading.hide();

  isDialogVisible.value = false;
};
</script>

<template>
  <q-dialog
    maximized
    v-model="isDialogVisible"
  >
    <q-card>
      <q-card-section>
        <q-btn
          v-close-popup
          icon="eva-close"
          flat
          dense
        />
      </q-card-section>

      <h4 class="q-mx-lg q-mb-lg">{{ dialogTitle }}</h4>

      <q-input
        v-if="dialogType === ItemType.name"
        v-model="dialogModel"
        autofocus
        outlined
        clearable
        maxlength="20"
        placeholder="Имя"
        class="q-mx-lg"
      />

      <q-input
        v-else-if="dialogType === ItemType.surname"
        v-model="dialogModel"
        autofocus
        outlined
        clearable
        maxlength="20"
        placeholder="Фамилия"
        class="q-mx-lg"
      />

      <q-date
        v-else-if="dialogType === ItemType.dateOfBirth"
        v-model="dialogModel"
        flat
        minimal
        class="full-width"
      ></q-date>

      <q-input
        v-else-if="dialogType === ItemType.email"
        v-model="dialogModel"
        autofocus
        outlined
        clearable
        maxlength="40"
        placeholder="Эл. почта"
        :rules="['email']"
        class="q-mx-lg"
      />

      <my-phone-input
        v-else-if="dialogType === ItemType.phone"
        v-model="dialogModel"
        autofocus
        class="q-mx-lg"
      />

      <q-btn
        unelevated
        :disable="!Boolean(dialogModel)"
        label="Сохранить"
        color="primary"
        class="fixed-bottom q-ma-lg"
        @click="handleSave"
      />
    </q-card>
  </q-dialog>
</template>
