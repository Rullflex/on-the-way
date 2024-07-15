import { Query } from 'appwrite';
import { AppWriteApi } from 'src/plugins/appwrite';
import { ITrip } from 'src/shared/types';

type ITripRequestPayload = Omit<ITrip, 'driver' | 'car' | 'passengers'> & {
  driver: string;
  car: string;
  passengers?: string[];
};

export const tripsApi = new AppWriteApi({
  collectionId: '6686b44d001c31636f7e',
});

export const getTripById = (id: string) => tripsApi.getById<ITrip>(id);

export const getAllTrips = () => tripsApi.getAll<ITrip>();

export const getTripsByDate = (date: string) => tripsApi.getAll<ITrip>([Query.equal('departureDate', date)]);

export const createTrip = (payload: ITripRequestPayload) => tripsApi.create(payload);

export const deleteTrip = (id: string) => tripsApi.delete(id);

export const updateTrip = (id: string, payload: Partial<ITripRequestPayload>) => tripsApi.update<ITrip>(id, payload);
