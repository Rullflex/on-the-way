import { Query } from 'appwrite';
import { tripsApi } from 'src/shared/api';
import { ITrip } from 'src/shared/types';
import { useTripSettingsStore } from 'src/stores/trip-settings';

export const getFilteredTrips = async (sortOption: string) => {
  const store = useTripSettingsStore();
  const queries: string[] = [
    Query.equal('departureDate', store.date),
    Query.or([Query.equal('departureCity', store.origin), Query.contains('intermediateCities', store.origin)]),
    Query.or([Query.equal('arrivalCity', store.destination), Query.contains('intermediateCities', store.destination)]),
    ...(store.conveniences.length > 0 ? store.conveniences.map(convenience => Query.contains('conveniences', convenience)) : []),
    Query.orderAsc(sortOption),
  ];

  return tripsApi.getAll<ITrip>(queries);
};
