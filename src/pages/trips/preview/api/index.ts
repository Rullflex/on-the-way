import { Notify } from 'quasar';
import { getTripById, Query, updateTrip, usersApi } from 'src/shared/api';
import { TripStatus } from 'src/shared/constants';
import { IUser } from 'src/shared/types';
import { useTripSettingsStore } from 'src/stores/trip-settings';
import { useUserStore } from 'src/stores/user';

const userStore = useUserStore();
const tripSettingsStore = useTripSettingsStore();

export const reserveTrip = async (tripId: string) => {
  const { passengerIds, totalPassengers } = await getTripById(tripId);

  if (totalPassengers - passengerIds.length < tripSettingsStore.passengers) {
    Notify.create({
      type: 'negative',
      message: 'Недостаточно свободных мест',
      position: 'top',
    });
    return;
  }

  const seats = Array.from({ length: tripSettingsStore.passengers }, () => userStore.accountId);

  const updatedTrip = await updateTrip(tripId, {
    passengerIds: [...passengerIds, ...seats],
  });

  Notify.create({
    type: 'positive',
    message: 'Поездка забронирована',
    position: 'top',
  });

  return updatedTrip;
};

export const cancelReservation = async (tripId: string) => {
  const trip = await getTripById(tripId);
  const updatedTrip = await updateTrip(tripId, {
    passengerIds: trip.passengerIds.filter((id) => id !== userStore.accountId) ?? [],
  });

  Notify.create({
    message: 'Бронирование отменено',
    position: 'top',
  });

  return updatedTrip;
};

export const cancelTrip = async (tripId: string) => {
  const updatedTrip = await updateTrip(tripId, {
    status: TripStatus.CANCELED,
  });

  Notify.create({
    message: 'Поездка отменена',
    position: 'top',
  });

  return updatedTrip;
};

export const completeTrip = async (tripId: string) => {
  const updatedTrip = await updateTrip(tripId, {
    status: TripStatus.COMPLETED,
  });

  Notify.create({
    message: 'Поездка завершена',
    position: 'top',
  });

  return updatedTrip;
};

export const getPassengers = (passengerIds: string[]) => usersApi.getAll<IUser>([Query.equal('$id', passengerIds)]);
