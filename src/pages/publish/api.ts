import { Query, tripsApi } from 'src/shared/api';
import { ITrip } from 'src/shared/types';

export const getDriverTrips = (driverId: string, limit: number) =>
  tripsApi.getAll<ITrip>([Query.equal('driverId', driverId), Query.limit(limit), Query.orderDesc('$createdAt')]);
