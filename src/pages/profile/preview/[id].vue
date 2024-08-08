<script setup lang="ts">
import { MyAvatar, MyItem } from 'src/shared/ui';
import { captureApiException, parseAge } from 'src/shared/utils';
import { getAvatarURL, getUserById } from 'src/shared/api';
import { Loading } from 'quasar';
import { IUser } from 'src/shared/types';

interface IProps {
  id: string;
}

const props = defineProps<IProps>();
const user = ref<Omit<IUser, 'cars'>>();

const userAge = computed(() => (user.value?.dateOfBirth ? parseAge(user.value.dateOfBirth).age : ''));

const userAvatar = computed(() => {
  return user.value?.avatarFileId ? getAvatarURL(user.value.avatarFileId) : '';
});

Loading.show();
getUserById(props.id)
  .then((response) => {
    user.value = {
      name: response.name,
      surname: response.surname,
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
          <q-item-label class="text-h5">{{ user.name }} {{ user.surname }}</q-item-label>
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

      <q-separator
        spaced="1rem"
        inset
      />

      <q-item-label header>Контактные данные</q-item-label>

      <my-item
        :color="user.phone ? 'primary' : undefined"
        :href="user.phone ? `tel:${user.phone}` : undefined"
        :label="user.phone ?? 'Не указан'"
        caption="Номер телефона"
      />

      <my-item
        :color="user.email ? 'primary' : undefined"
        :href="user.email ? `mailto:${user.email}` : undefined"
        :label="user.email ?? 'Не указан'"
        caption="Адрес эл. почты"
      />
    </q-list>
  </q-page>
</template>

<route lang="yaml">
meta:
  layout: subPage
  fallbackRoute: '/profile'
</route>
