import { getAvatarURL, Response } from 'src/shared/api';
import { ICar, IUser } from 'src/shared/types';
import { formatDate, parseAge } from 'src/shared/utils';

type State = IUser & { accountId: string };

export const useUserStore = defineStore('user', {
  state: () =>
    ({
      accountId: '',
      name: '',
      surname: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      avatarFileId: '',
      cars: [],
    } as State),
  getters: {
    avatarURL: (state) => (state.avatarFileId ? getAvatarURL(state.avatarFileId) : ''),
    age: (state) => (state.dateOfBirth ? parseAge(state.dateOfBirth).age : ''),
    birthday: (state) => (state.dateOfBirth ? formatDate(state.dateOfBirth, 'short') : ''),
  },
  actions: {
    addCar(car: Response<ICar>) {
      this.cars = [...this.cars, car];
    },
    updateCar(carId: string, payload: Partial<ICar>) {
      this.cars = this.cars.map((car) => (car.$id === carId ? { ...car, ...payload } : car));
    },
    deleteCar(carId: string) {
      this.cars = this.cars.filter((car) => car.$id !== carId);
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
