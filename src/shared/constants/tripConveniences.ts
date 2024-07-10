import { TripConveniencesNames } from 'src/shared/enums';
import { ITripConvenience } from 'src/shared/types';

export const TRIP_CONVENIENCES: ITripConvenience[] = [
  {
    name: TripConveniencesNames.PETS_ALLOWED,
    icon: 'pets',
    title: 'Можно с животными',
  },
  {
    name: TripConveniencesNames.BAGGAGE_TRANSPORTATION,
    icon: 'eva-briefcase-outline',
    title: 'Перевозка багажа',
  },
  {
    name: TripConveniencesNames.PACKAGE_DELIVERY,
    icon: 'eva-cube-outline',
    title: 'Беру посылки',
  },
  {
    name: TripConveniencesNames.CHILD_SEAT,
    icon: 'child_care',
    title: 'Есть детское кресло',
  },
  {
    name: TripConveniencesNames.AIR_CONDITIONER,
    icon: 'air',
    title: 'Есть кондиционер',
  },
  {
    name: TripConveniencesNames.TWO_IN_THE_BACK,
    icon: 'social_distance',
    title: 'Максимум двое сзади',
  },
];
