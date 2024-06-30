<script setup lang="ts">
import { useUserInfoStore } from 'src/stores/user-info';
import { MyAvatar, MyItem, MyPhoneInput } from 'src/shared/ui';

const monthNames = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
];

type ItemType = 'name' | 'surname' | 'dateOfBirth' | 'email' | 'phone';
type IListItem = { label: string; value: string; type: ItemType };

const userInfoStore = useUserInfoStore();
const { avatar, name, surname, dateOfBirth, email, phone } = storeToRefs(userInfoStore);

const formattedDateOfBirth = computed(() => {
  if (dateOfBirth.value) {
    const [year, month, day] = dateOfBirth.value.split('/');
    return `${day} ${monthNames[Number(month) - 1]} ${year}`;
  }
  return '';
});

const listItems = computed<IListItem[]>(() => [
  { label: 'Имя', value: name.value, type: 'name' },
  { label: 'Фамилия', value: surname.value, type: 'surname' },
  { label: 'Дата рождения', value: formattedDateOfBirth.value, type: 'dateOfBirth' },
  { label: 'Адрес эл. почты', value: email.value, type: 'email' },
  { label: 'Номер телефона', value: phone.value, type: 'phone' },
]);

const isDialogVisible = ref(false);
const dialogType = ref<ItemType>('name');
const dialogModel = ref<string | null>('');
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
  dialogModel.value = userInfoStore[type];
};

const handleAvatarChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    avatar.value = URL.createObjectURL(target.files[0]);
  }
};

const handleSave = () => {
  switch (dialogType.value) {
    case 'name':
      name.value = dialogModel.value ?? '';
      break;
    case 'surname':
      surname.value = dialogModel.value ?? '';
      break;
    case 'dateOfBirth':
      dateOfBirth.value = dialogModel.value ?? '';
      break;
    case 'email':
      email.value = dialogModel.value ?? '';
      break;
    case 'phone':
      phone.value = dialogModel.value ?? '';
      break;
  }
  isDialogVisible.value = false;
  dialogModel.value = '';
};
</script>

<template>
  <q-layout>
    <q-page-container>
      <q-page class="q-pa-lg">
        <q-btn
          @click="$router.back()"
          icon="eva-arrow-back-outline"
          flat
          dense
          class="q-ml-xs"
        />

        <div class="text-h5 text-bold q-mb-lg q-mt-md q-ml-md">Редактирование профиля</div>

        <q-list>
          <!-- ANCHOR - Add Profile Photo -->
          <my-item
            tag="label"
            color="primary"
            :icon="avatar ? 'eva-edit-outline' : 'eva-plus-circle-outline'"
            :label="`${avatar ? 'Изменить' : 'Добавить'} фото профиля`"
          >
            <template #append>
              <q-item-section avatar>
                <my-avatar
                  self
                  size="5rem"
                />
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
    </q-page-container>
  </q-layout>

  <q-dialog
    maximized
    v-model="isDialogVisible"
  >
    <q-card>
      <q-card-section class="q-pb-none">
        <q-btn
          v-close-popup
          icon="eva-close"
          flat
          dense
        />
      </q-card-section>

      <q-card-section class="q-pa-lg">
        <p class="text-h4 text-bold text-blue-grey-9 q-mb-lg">{{ dialogTitle }}</p>

        <q-input
          v-if="dialogType === 'name'"
          v-model="dialogModel"
          outlined
          clearable
          maxlength="20"
          placeholder="Имя"
        />

        <q-input
          v-else-if="dialogType === 'surname'"
          v-model="dialogModel"
          outlined
          clearable
          maxlength="20"
          placeholder="Фамилия"
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
        />

        <my-phone-input
          v-else-if="dialogType === 'phone'"
          v-model="dialogModel"
        />
      </q-card-section>

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
