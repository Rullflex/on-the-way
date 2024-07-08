<script setup lang="ts">
import { useUserInfoStore } from 'src/stores/user-info';
import { MyAvatar, MyBackBtn, MyItem, MyPhoneInput } from 'src/shared/ui';
import { MONTHS_NAMES_IN_GENITIVE } from 'src/shared/constants';
import { AppwriteException, updateUser, uploadAvatar } from 'src/shared/api';
import { captureApiException } from 'src/shared/utils';
import { Loading } from 'quasar';

type ItemType = 'name' | 'surname' | 'dateOfBirth' | 'email' | 'phone';
type IListItem = { label: string; value: string; type: ItemType };

const userInfoStore = useUserInfoStore();
const { id, avatarFileId, name, surname, dateOfBirth, email, phone } = storeToRefs(userInfoStore);

const formattedDateOfBirth = computed(() => {
  if (!dateOfBirth.value) {
    return '';
  }

  const date = new Date(dateOfBirth.value);
  const [day, month, year] = [date.getDate(), date.getMonth(), date.getFullYear()];

  return `${day} ${MONTHS_NAMES_IN_GENITIVE[month]} ${year}`;
});

const listItems = computed<IListItem[]>(() => [
  { label: 'Имя', value: name.value ?? '', type: 'name' },
  { label: 'Фамилия', value: surname.value ?? '', type: 'surname' },
  { label: 'Дата рождения', value: formattedDateOfBirth.value, type: 'dateOfBirth' },
  { label: 'Адрес эл. почты', value: email.value ?? '', type: 'email' },
  { label: 'Номер телефона', value: phone.value ?? '', type: 'phone' },
]);

const isDialogVisible = ref(false);
const dialogType = ref<ItemType>('name');
const dialogModel = ref<string>('');
const dialogTitle = computed(() => {
  switch (dialogType.value) {
    case 'name':
      return 'Как вас зовут?';
    case 'surname':
      return 'Какая у вас фамилия?';
    case 'dateOfBirth':
      return 'Когда вы родились?';
    case 'email':
      return 'Введите эл. почту';
    case 'phone':
      return 'Подтвердите номер телефона';
    default:
      return '';
  }
});

const showDialogByType = (type: ItemType) => {
  isDialogVisible.value = true;
  dialogType.value = type;
  dialogModel.value = userInfoStore[type] ?? '';
};

const handleAvatarChange = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (!target.files) {
    return;
  }

  Loading.show();
  try {
    const response = await uploadAvatar(target.files[0]);
    await updateUser(id.value, { avatarFileId: response.$id });
    avatarFileId.value = response.$id;
  } catch (error) {
    captureApiException(error as AppwriteException);
  } finally {
    Loading.hide();
  }
};

const handleSave = async () => {
  Loading.show();
  await updateUser(id.value, { [dialogType.value]: dialogModel.value })
    .then(() => userInfoStore.$patch({ [dialogType.value]: dialogModel.value }))
    .catch(captureApiException);
  Loading.hide();

  isDialogVisible.value = false;
  dialogModel.value = '';
};
</script>

<template>
  <q-page>
    <div class="sticky-top bg-white q-pa-md z-top">
      <my-back-btn fallback-route="/profile" />
    </div>

    <h5 class="q-mb-lg q-mx-lg">Редактирование профиля</h5>

    <q-list class="q-pa-sm">
      <!-- ANCHOR - Add Profile Photo -->
      <my-item
        tag="label"
        color="primary"
        :icon="avatarFileId ? 'eva-edit-outline' : 'eva-plus-circle-outline'"
        :label="`${avatarFileId ? 'Изменить' : 'Добавить'} фото профиля`"
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

      <!-- ANCHOR - List Items -->
      <my-item
        v-for="item in listItems"
        chevron
        clickable
        :key="item.label"
        :label="item.label"
        :caption="item.value || 'Не указано'"
        @click="showDialogByType(item.type)"
      />
    </q-list>
  </q-page>

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
        v-if="dialogType === 'name'"
        v-model="dialogModel"
        outlined
        clearable
        maxlength="20"
        placeholder="Имя"
        class="q-mx-lg"
      />

      <q-input
        v-else-if="dialogType === 'surname'"
        v-model="dialogModel"
        outlined
        clearable
        maxlength="20"
        placeholder="Фамилия"
        class="q-mx-lg"
      />

      <q-date
        v-else-if="dialogType === 'dateOfBirth'"
        v-model="dialogModel"
        flat
        minimal
        class="full-width"
      ></q-date>

      <q-input
        v-else-if="dialogType === 'email'"
        v-model="dialogModel"
        outlined
        clearable
        maxlength="40"
        placeholder="Эл. почта"
        :rules="['email']"
        class="q-mx-lg"
      />

      <my-phone-input
        v-else-if="dialogType === 'phone'"
        v-model="dialogModel"
        class="q-mx-lg"
      />

      <!-- ANCHOR - Save Button -->
      <q-btn
        unelevated
        label="Сохранить"
        color="primary"
        class="fixed-bottom q-ma-lg"
        @click="handleSave"
      />
    </q-card>
  </q-dialog>
</template>
