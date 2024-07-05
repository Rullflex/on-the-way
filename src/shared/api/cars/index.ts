import { AppWriteApi } from '..';
import { ICar } from './types';

const api = new AppWriteApi({
  collectionId: '6686664d002982e9dffd',
});

export const getCarById = async (id: string) => api.getById<ICar>(id);

export const getAllCars = async () => api.getAll<ICar>();

export const createCar = async (payload: ICar) => api.create(payload);

export const deleteCar = async (id: string) => api.delete(id);

export const updateCar = async (id: string, payload: Partial<ICar>) => api.update(id, payload);

export { type ICar };
