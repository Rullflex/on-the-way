import { AppWriteApi } from 'src/plugins/appwrite';
import { ICar } from 'src/shared/types';

export const carsApi = new AppWriteApi({
  collectionId: '6686664d002982e9dffd',
});

export const getCarById = (id: string) => carsApi.getById<ICar>(id);

export const getAllCars = () => carsApi.getAll<ICar>();

export const createCar = (payload: Omit<ICar, 'user'> & { user: string }) => carsApi.create(payload);

export const deleteCar = (id: string) => carsApi.delete(id);

export const updateCar = (id: string, payload: Partial<ICar>) => carsApi.update(id, payload);
