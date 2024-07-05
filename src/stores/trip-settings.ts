export const useTripSettingsStore = defineStore('trip-settings', {
  state: () => ({
    origin: '',
    destination: '',
    date: '',
    passengers: 1,
  }),
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTripSettingsStore, import.meta.hot));
}
