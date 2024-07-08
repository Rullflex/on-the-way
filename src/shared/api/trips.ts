import { AppWriteApi } from 'src/plugins/appwrite';
import { ITrip } from './types';

export const tripsApi = new AppWriteApi({
  collectionId: '6686b44d001c31636f7e',
});

export const getTripById = (id: string) => tripsApi.getById<ITrip>(id);

export const getAllTrips = () => tripsApi.getAll<ITrip>();

export const createTrip = (payload: ITrip) => tripsApi.create(payload);

export const deleteTrip = (id: string) => tripsApi.delete(id);

export const updateTrip = (id: string, payload: Partial<ITrip>) => tripsApi.update(id, payload);
