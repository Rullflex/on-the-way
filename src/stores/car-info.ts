export interface CarInfo {
  id: number;
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
  getters: {
    carById: (state) => (id: number) => {
      return state.cars.find((car) => car.id === id);
    },
  },
  actions: {
    addCar(payload: CarInfo) {
      this.cars.push(payload);
    },
    deleteCar(id: number) {
      this.cars = this.cars.filter((car) => car.id !== id);
    },
    updateCar(id: number, payload: Partial<CarInfo>) {
      const index = this.cars.findIndex((car) => car.id === id);
      if (index !== -1) {
        this.cars[index] = { ...this.cars[index], ...payload };
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCarInfoStore, import.meta.hot));
}
