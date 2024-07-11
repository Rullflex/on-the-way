import { ICar } from 'src/shared/types';
import { captureApiException } from 'src/shared/utils';
import { Response } from 'src/plugins/appwrite/types';
import { AppwriteException } from 'appwrite';
import { useUserStore } from 'stores/user';
import { updateCar } from 'src/shared/api';

const userStore = useUserStore();

export const updateCarById = async (carId: string, payload: ICar) => {
  try {
    await updateCar(carId, payload).then(response => {
      userStore.cars = userStore.cars.map(car => car.$id === carId ? { ...response } as Response<ICar> : car);
    });
  } catch (error) {
    captureApiException(error as AppwriteException);
  }
};
