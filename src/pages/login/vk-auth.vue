<script lang="ts" setup>
import { Notify } from 'quasar';
import { account } from 'src/plugins/appwrite';
import VKID from 'src/plugins/vkid';
import { createUser, getUserById, uploadAvatar } from 'src/shared/api';
import { useUserStore } from 'src/stores/user';

interface UserInfoProperties {
  avatar: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  user_id: string;
  birthday: string;
}

const route = useRoute();
const router = useRouter();
const { code, device_id } = route.query;

const userStore = useUserStore();

const hashPassword = async (str: string) => {
  const hashBuffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((byte) => byte.toString(16).padStart(2, '0')).join('');
};

const getImageFile = async (url: string) => {
  const response = await fetch(url);
  const blob = await response.blob();
  return new File([blob], 'avatar.jpg', { type: 'image/jpg' });
};

const showError = (message: string) => {
  Notify.create({ type: 'negative', message, position: 'top' });
};

(async () => {
  let vkidAccessToken = '';
  try {
    const { access_token } = await VKID.Auth.exchangeCode(code as string, device_id as string);
    vkidAccessToken = access_token;
  } catch (error) {
    await router.push('/login');
    return;
  }
  const { user } = (await VKID.Auth.userInfo(vkidAccessToken)) as { user: UserInfoProperties };
  const { avatar: avatarUrl, user_id: userId, email, phone, first_name: name, last_name: surname, birthday } = user;

  const password = await hashPassword(userId);
  const dateOfBirth = birthday.split('.').reverse().join('/');

  const existedUser = await getUserById(userId).catch(() => null);

  if (!existedUser) {
    const { $id: avatarFileId } = await getImageFile(avatarUrl).then(uploadAvatar);

    await Promise.all([
      account.create(userId, email, password, `${name} ${surname}`),
      createUser({ email, phone, name, surname, dateOfBirth, avatarFileId }, userId),
    ]).catch(() => showError('Ошибка при создании пользователя'));
  } else {
    userStore.$patch({
      accountId: userId,
      name: existedUser.name,
      surname: existedUser.surname,
      email: existedUser.email,
      phone: existedUser.phone,
      dateOfBirth: existedUser.dateOfBirth,
      avatarFileId: existedUser.avatarFileId,
    });
  }

  await account.createEmailPasswordSession(email, password).catch(() => showError('Ошибка при создании сессии'));

  router.push({ path: '/', replace: true });
})();
</script>

<template>
  <q-layout>
    <q-page-container>
      <q-page class="column flex-center gap-lg">
        <p>Вход с помощью ВКонтакте</p>

        <q-spinner
          color="primary"
          size="3em"
          :thickness="3"
        />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<route lang="yaml">
meta:
  layout: blank
</route>
