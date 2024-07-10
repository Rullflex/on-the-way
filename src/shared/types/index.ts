import { Response } from '../api';

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
  arrivalTime: string;
  totalPassengers: number;
  alreadyReserved: number;
  conveniences: string[];
  departureCity: string;
  arrivalCity: string;
  departureAddress: string;
  arrivalAddress: string;
  intermediateCities: string[];
  canPickUpFromPlace: boolean;
  canDriveToPlace: boolean;
  driver: Response<IUser>;
  comment: string;
}

export interface ICar {
  licensePlate: string;
  name: string;
  bodyType: string;
  color: string;
  year: number;
}
