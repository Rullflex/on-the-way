import { acceptHMRUpdate, defineStore } from 'pinia';

export const useDriveSettingsStore = defineStore('drive-settings', {
  state: () => ({
    origin: '',
    destination: '',
    date: '',
    passengers: 1,
  }),
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDriveSettingsStore, import.meta.hot));
}