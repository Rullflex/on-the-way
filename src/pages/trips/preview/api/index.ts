import { Notify } from 'quasar';
import { getTripById, updateTrip } from 'src/shared/api';
import { useTripSettingsStore } from 'src/stores/trip-settings';
import { useUserStore } from 'src/stores/user';

const userStore = useUserStore();
const tripSettingsStore = useTripSettingsStore();

export const reserveTrip = async (tripId: string) => {
  const { passengers, totalPassengers } = await getTripById(tripId);

  if (totalPassengers - passengers.length < tripSettingsStore.passengers) {
    Notify.create({
      type: 'negative',
      message: 'Недостаточно свободных мест',
      position: 'top',
    });
    return;
  }

  const updatedTrip = await updateTrip(tripId, {
    passengers: [...passengers.map((p) => p.$id), userStore.accountId],
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
    passengers: trip.passengers.map((p) => p.$id).filter((id) => id !== userStore.accountId) ?? [],
  });

  Notify.create({
    message: 'Бронирование отменено',
    position: 'top',
  });

  return updatedTrip;
};
