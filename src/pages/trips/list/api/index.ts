import { Query } from 'appwrite';
import { tripsApi } from 'src/shared/api';
import { ITrip } from 'src/shared/types';
import { TripConveniencesNames } from 'src/shared/enums';

interface ITripFilters {
  date: string;
  origin: string;
  destination: string;
  conveniences: TripConveniencesNames[];
}

export const getFilteredTrips = async ({ date, origin, destination, conveniences }: ITripFilters) => {
  const queries: string[] = [
    Query.equal('departureDate', date),
    Query.or([Query.equal('departureCity', origin), Query.contains('intermediateCities', origin)]),
    Query.or([Query.equal('arrivalCity', destination), Query.contains('intermediateCities', destination)]),
    Query.orderAsc('departureTime'),
  ];

  conveniences.forEach(convenience => {
    queries.push(Query.equal('conveniences', convenience));
  });

  return tripsApi.getAll<ITrip>(queries);
};
