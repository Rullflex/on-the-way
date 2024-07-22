import { TripConveniencesNames } from 'src/shared/enums';

export const useTripSettingsStore = defineStore('trip-settings', {
  state: () => ({
    origin: '',
    destination: '',
    date: '',
    passengers: 1,
    conveniences: [] as TripConveniencesNames[],
  }),
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTripSettingsStore, import.meta.hot));
}
