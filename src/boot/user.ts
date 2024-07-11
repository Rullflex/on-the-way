import { boot } from 'quasar/wrappers';
import { getUserById } from 'src/shared/api';
import { useUserStore } from 'stores/user';
import { account } from 'src/plugins/appwrite';

export default boot(async ({ router }) => {
  const userStore = useUserStore();

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
    if (!userStore.accountId && to.path !== '/login' && to.path !== '/register') {
      next({ path: '/login' });
    } else if (userStore.accountId && (to.path === '/login' || to.path === '/register')) {
      next({ path: '/', replace: true });
    } else {
      next();
    }
  });
});
