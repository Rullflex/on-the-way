export { type ITripConvenience } from './tripConvenience';
import { Response } from '../api';
import { TripStatus } from '../constants';
import { TripConveniencesNames } from '../enums';

export interface IUser {
  name: string;
  surname: string | null;
  email: string | null;
  phone: string | null;
  dateOfBirth: string | null;
  avatarFileId: string | null;
  cars: Response<ICar>[];
}

export interface ITrip {
  status: TripStatus;
  price: number;
  departureDate: string;
  departureTime: string;
  totalPassengers: number;
  conveniences: TripConveniencesNames[];
  departureCity: string;
  arrivalCity: string;
  departureAddress: string;
  arrivalAddress: string;
  intermediateCities: string[];
  canPickUpFromPlace: boolean;
  canDriveToPlace: boolean;
  driver: Response<IUser>;
  driverId: string;
  passengerIds: string[];
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
