import { getAvatarURL } from 'src/shared/api';
import { IUser } from 'src/shared/types';

type State = Omit<IUser, 'trips'> & { accountId: string };

export const useUserStore = defineStore('user', {
  state: () =>
    ({
      accountId: '',
      name: '',
      surname: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      avatarFileId: '',
      cars: [],
    } as State),
  getters: {
    avatarURL: (state) => (state.avatarFileId ? getAvatarURL(state.avatarFileId) : ''),
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
