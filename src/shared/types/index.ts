export interface IUser {
  dateOfBirth: string | null;
  name: string;
  surname: string | null;
  email: string | null;
  phone: string;
  avatarFileId: string | null;
  cars: ICar[];
  trips: ITrip[];
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
  driver: IUser;
  comment: string;
}

export interface ICar {
  licensePlate: string;
  name: string;
  bodyType: string;
  color: string;
  year: number;
}
