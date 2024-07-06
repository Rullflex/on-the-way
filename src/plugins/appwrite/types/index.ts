import { Models } from 'appwrite';

export type Response<T> = Models.Document & T;
export type Payload<T> = Omit<Models.Document & T, keyof Models.Document>;
