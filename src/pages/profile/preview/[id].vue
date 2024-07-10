<script setup lang="ts">
import { MyAvatar, MyItem } from 'src/shared/ui';
import { captureApiException, getPluralNoun } from 'src/shared/utils';
import { getAvatarURL, getUserById } from 'src/shared/api';
import { date as qDate } from 'quasar';
import { Loading } from 'quasar';
import { IUser } from 'src/shared/types';

interface IProps {
  id: string;
}

const props = defineProps<IProps>();
const user = ref<Omit<IUser, 'cars' | 'trips' | 'surname'>>();

const userAge = computed(() => {
  if (!user.value?.dateOfBirth) {
    return '';
  }

  const years = qDate.getDateDiff(new Date(), user.value.dateOfBirth, 'years');
  return `${years} ${getPluralNoun(years, 'год', 'года', 'лет')}`;
});

const userAvatar = computed(() => {
  return user.value?.avatarFileId ? getAvatarURL(user.value.avatarFileId) : '';
});

Loading.show();
getUserById(props.id)
  .then((response) => {
    user.value = {
      name: response.name,
      email: response.email,
      phone: response.phone,
      dateOfBirth: response.dateOfBirth,
      avatarFileId: response.avatarFileId,
    };
  })
  .catch(captureApiException)
  .finally(Loading.hide);
</script>

<template>
  <q-page v-if="user">
    <q-list class="q-px-sm">
      <q-item>
        <q-item-section>
          <q-item-label class="text-h5">{{ user.name }}</q-item-label>
          <q-item-label
            v-if="userAge"
            caption
          >
            {{ userAge }}
          </q-item-label>
        </q-item-section>

        <q-item-section avatar>
          <my-avatar
            size="5rem"
            :src="userAvatar"
          />
        </q-item-section>
      </q-item>

      <my-item
        color="positive"
        icon="eva-done-all-outline"
        label="Профиль подтвержден"
      />

      <q-separator
        spaced
        inset
      />

      <q-item-label header>Личные данные</q-item-label>

      <my-item
        :label="user.phone ?? 'Не указан'"
        caption="Номер телефона"
      />

      <my-item
        :label="user.email ?? 'Не указан'"
        caption="Адрес эл. почты"
      />
    </q-list>

    <q-separator
      spaced="1rem"
      size="0.5rem"
    />

    <q-list class="q-px-sm">
      <my-item
        color="negative"
        label="Пожаловаться на пользователя"
      />
    </q-list>
  </q-page>
</template>

<route lang="yaml">
meta:
  layout: subPage
</route>
