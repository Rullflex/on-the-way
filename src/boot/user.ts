import { boot } from 'quasar/wrappers';
import { getUserById } from 'src/shared/api';
import { useUserInfoStore } from 'stores/user-info';
import { account } from 'src/plugins/appwrite';

export default boot(async ({ router }) => {
  const userStore = useUserInfoStore();

  try {
    const { $id: accountId } = await account.get();
    const user = await getUserById(accountId);

    userStore.$patch({
      accountId: user.$id,
      avatarFileId: user.avatarFileId,
      name: user.name,
      surname: user.surname,
      dateOfBirth: user.dateOfBirth,
      email: user.email,
      phone: user.phone,
      cars: user.cars,
    });
  } catch (error) {}

  router.beforeEach((to, _from, next) => {
    if (to.path !== '/login' && !userStore.accountId) {
      next({ path: '/login' });
    } else {
      next();
    }
  });
});
