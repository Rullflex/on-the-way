import { ITravelOptions } from 'src/shared/types/travelTypes';

export interface ICityInfo {
  city: string,
  location: string,
  option: string,
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
      location: '',
      option: ''
    },
    destinationCity: {
      city: '',
      location: '',
      option: ''
    },
    intermediateCities: [],
    travelOptions: {
      isAnimalsAvailable: false,
      isBaggageAvailable: false,
      isPackageAvailable: false,
      isChildSeatAvailable: false,
      hasAirCondition: false,
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
  import.meta.hot.accept(acceptHMRUpdate(usePublishSettingsStore, import.meta.hot));
}
