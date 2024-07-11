import { ICar } from 'src/shared/types';
import { createCar, Response } from 'src/shared/api';
import { captureApiException } from 'src/shared/utils';
import { AppwriteException } from 'appwrite';
import { useUserStore } from 'stores/user';

const userStore = useUserStore();

export const addCar = async (payload: ICar) => {
  try {
    await createCar({ ...payload, user: userStore.accountId }).then(response => {
      userStore.cars.push({ ...response } as Response<ICar>);
    });
  } catch (error) {
    captureApiException(error as AppwriteException);
  }
};
