import { AppWriteApi } from 'src/plugins/appwrite';
import { ITrip } from './types';

const api = new AppWriteApi({
  collectionId: '6686b44d001c31636f7e',
});

export const getTripById = (id: string) => api.getById<ITrip>(id);

export const getAllTrips = () => api.getAll<ITrip>();

export const createTrip = (payload: ITrip) => api.create(payload);

export const deleteTrip = (id: string) => api.delete(id);

export const updateTrip = (id: string, payload: Partial<ITrip>) => api.update(id, payload);
