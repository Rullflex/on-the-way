export const useDriveSettingsStore = defineStore('drive-settings', {
  state: () => ({
    origin: '',
    destination: '',
    date: '',
    passengers: 1,
    time: '',
  }),
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDriveSettingsStore, import.meta.hot));
}
