import { defineStore, acceptHMRUpdate } from 'pinia';

export const useUserInfoStore = defineStore('user-info', {
  state: () => ({
    avatar: '',
    name: 'Дмитрий',
    surname: 'Горшков',
    dateOfBirth: '1999/03/26',
    email: 'libafer99@gmail.com',
    phone: '+7 (999) 999-99-99',
  }),
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserInfoStore, import.meta.hot));
}
