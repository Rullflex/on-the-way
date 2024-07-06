import { AppWriteApi } from 'src/plugins/appwrite';
import { ICar } from './types';

const api = new AppWriteApi({
  collectionId: '6686664d002982e9dffd',
});

export const getCarById = (id: string) => api.getById<ICar>(id);

export const getAllCars = () => api.getAll<ICar>();

export const createCar = (payload: ICar) => api.create(payload);

export const deleteCar = (id: string) => api.delete(id);

export const updateCar = (id: string, payload: Partial<ICar>) => api.update(id, payload);
