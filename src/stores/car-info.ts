import { defineStore } from 'pinia';

interface CarInfo {
  licensePlate: string;
  name: string;
  bodyType: string;
  color: string;
  year: string;
}

export const useCarInfoStore = defineStore('car-info', {
  state: () => ({
    cars: [] as CarInfo[],
  }),
  actions: {
    addCar(payload: CarInfo) {
      this.cars.push(payload);
    },
  },
});
