import { Query } from 'appwrite';
import { tripsApi } from 'src/shared/api';
import { ITrip } from 'src/shared/types';

interface ITripFilters {
  date: string;
  origin: string;
  destination: string;
}

export const getFilteredTrips = async ({ date, origin, destination }: ITripFilters) => {
  const queries: string[] = [
    Query.equal('departureDate', date),
    Query.or([Query.equal('departureCity', origin), Query.contains('intermediateCities', origin)]),
    Query.or([Query.equal('arrivalCity', destination), Query.contains('intermediateCities', destination)]),
    Query.orderAsc('departureTime'),
  ];

  return tripsApi.getAll<ITrip>(queries);
};