import { defineStore } from 'pinia';

export const useDriveSettingsStore = defineStore('drive-settings', {
  state: () => ({
    origin: '',
    destination: '',
    date: '',
    passengers: 1,
  }),
});
