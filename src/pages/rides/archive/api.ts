import { date as QDateUtil } from 'quasar';
import { Query, getAllTrips } from 'src/shared/api';

export const getArchivedUserTrips = (userId: string) =>
  getAllTrips([
    Query.or([Query.contains('passengerIds', userId), Query.equal('driverId', userId)]),
    Query.lessThan('departureDate', QDateUtil.formatDate(new Date(), 'YYYY/MM/DD')),
    Query.orderDesc('departureDate'),
    Query.orderDesc('departureTime'),
  ]);
