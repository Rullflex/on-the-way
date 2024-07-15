import { Notify } from 'quasar';
import { getTripById, updateTrip } from 'src/shared/api';
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

  const updatedTrip = await updateTrip(tripId, {
    passengerIds: [...passengerIds, userStore.accountId],
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
