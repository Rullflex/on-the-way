import { deleteCar } from 'src/shared/api';
import { captureApiException } from 'src/shared/utils';
import { useUserStore } from 'stores/user';
import { AppwriteException } from 'appwrite';

const userStore = useUserStore();

export const deleteCarById = async (carId: string) => {
  try {
    await deleteCar(carId).then(() => {
      userStore.cars = userStore.cars.filter(car => car.$id !== carId);
    });
  } catch (error) {
    captureApiException(error as AppwriteException);
  }
};
