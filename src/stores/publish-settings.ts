import { useDriveSettingsStore } from 'stores/drive-settings';

interface ITravelOptions {
  isPackageAvailable: boolean,
  isBaggageAvailable: boolean,
  isChildSeatAvailable: boolean,
  isAnimalsAvailable: boolean,
  twoInTheBack: boolean
}

interface ICityInfo {
  city: string,
  location: string,
}

interface State {
  departureCity: ICityInfo,
  destinationCity: ICityInfo,
  intermediateCities: string[],
  travelOptions: ITravelOptions,
  date: '',
  time: ''
}

export const usePublishSettingsStore = defineStore('publish-settings', {
  state: (): State => ({
    departureCity: {
      city: '',
      location: ''
    },
    destinationCity: {
      city: '',
      location: ''
    },
    intermediateCities: [],
    travelOptions: {
      isAnimalsAvailable: false,
      isBaggageAvailable: false,
      isPackageAvailable: false,
      isChildSeatAvailable: false,
      twoInTheBack: false
    },
    date: '',
    time: ''
  }),

  actions: ({
    toggleIntermediateCity(city: string) {
      if (this.intermediateCities.includes(city)) {
        this.intermediateCities = this.intermediateCities.filter((item) => item !== city);
      } else {
        this.intermediateCities.push(city);
      }
    }
  })
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDriveSettingsStore, import.meta.hot));
}
