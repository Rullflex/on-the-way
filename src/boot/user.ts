import { boot } from 'quasar/wrappers';
import { Query, usersApi } from 'src/shared/api';
import { useUserInfoStore } from 'stores/user-info';

export default boot(async () => {
  // TODO: обработка исключения
  // TODO: захардкоженный id поменять при появлении авторизации
  const response = await usersApi.getById('6686cf1c002a99921ec3', [
    Query.select(['name', 'surname', 'dateOfBirth', 'email', 'phone', 'avatarFileId']),
  ]);

  const userStore = useUserInfoStore();
  userStore.$patch({
    id: '6686cf1c002a99921ec3',
    avatarFileId: response.avatarFileId,
    name: response.name,
    surname: response.surname,
    dateOfBirth: response.dateOfBirth,
    email: response.email,
    phone: response.phone,
  });
});
