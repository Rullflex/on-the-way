export { type ITripConvenience } from './tripConvenience';
import { Response } from '../api';
import { TripConveniencesNames } from '../enums';

export interface IUser {
  name: string;
  surname: string | null;
  email: string | null;
  phone: string | null;
  dateOfBirth: string | null;
  avatarFileId: string | null;
  cars: Response<ICar>[];
  trips: Response<ICar>[];
}

export interface ITrip {
  price: number;
  departureDate: string;
  departureTime: string;
  totalPassengers: number;
  alreadyReserved: number;
  conveniences: TripConveniencesNames[];
  departureCity: string;
  arrivalCity: string;
  departureAddress: string;
  arrivalAddress: string;
  intermediateCities: string[];
  canPickUpFromPlace: boolean;
  canDriveToPlace: boolean;
  driver: Response<IUser>;
  passengers: Response<IUser>[];
  car: Response<ICar>;
  comment: string;
}

export interface ICar {
  licensePlate: string;
  name: string;
  bodyType: string;
  color: string;
  year: number;
  user: Response<IUser>;
}
