export interface IUser {
  name: string;
  surname: string | null;
  email: string | null;
  phone: string | null;
  dateOfBirth: string | null;
  avatarFileId: string | null;
  cars: ICar[];
  trips: ITrip[];
}

export interface ITrip {
  price: number;
  departureTime: string;
  arrivalTime: string;
  totalPassengers: number;
  alreadyReserved: number;
  conveniences: string[];
  departureCity: string;
  arrivalCity: string;
  departureAddress: string;
  arrivalAddress: string;
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
