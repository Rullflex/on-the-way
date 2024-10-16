import { boot } from 'quasar/wrappers';
import { getUserById } from 'src/shared/api';
import { useUserStore } from 'stores/user';
import { account } from 'src/plugins/appwrite';
import { Notify } from 'quasar';

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
    if (to.path === '/privacy' || to.path === '/agreement') {
      next();
    } else if (!userStore.accountId && !to.path.startsWith('/login') && to.path !== '/register') {
      next({ path: '/login' });
    } else if (userStore.accountId && (to.path.startsWith('/login') || to.path === '/register')) {
      next({ path: '/', replace: true });
    } else if (
      userStore.accountId &&
      !to.path.startsWith('/profile/edit') &&
      (!userStore.name || !userStore.phone || !userStore.dateOfBirth || !userStore.surname)
    ) {
      Notify.create({
        position: 'top',
        message: 'Пожалуйста, заполните личные данные',
      });
      next({ path: '/profile/edit' });
    } else {
      next();
    }
  });
});
