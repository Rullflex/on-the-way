import { getAvatarURL } from 'src/shared/api';
import { IUser } from 'src/shared/types';

type State = Omit<IUser, 'cars' | 'trips'> & { id: string };

export const useUserInfoStore = defineStore('user-info', {
  state: () =>
    ({
      id: '',
      name: '',
      surname: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      avatarFileId: '',
    } as State),
  getters: {
    avatarURL: (state) => (state.avatarFileId ? getAvatarURL(state.avatarFileId) : ''),
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserInfoStore, import.meta.hot));
}
