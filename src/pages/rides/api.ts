import { date as QDateUtil } from 'quasar';
import { Query, getAllTrips } from 'src/shared/api';

export const getFutureUserTrips = (userId: string, fromDate: string = QDateUtil.formatDate(new Date(), 'YYYY/MM/DD')) =>
  getAllTrips([
    Query.or([Query.contains('passengerIds', userId), Query.equal('driverId', userId)]),
    Query.greaterThanEqual('departureDate', fromDate),
    Query.orderAsc('departureDate'),
    Query.orderAsc('departureTime'),
  ]);
