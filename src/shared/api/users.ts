import { AppWriteApi } from 'src/plugins/appwrite';
import { IUser } from './types';

export const usersApi = new AppWriteApi({
  collectionId: '6686cabb000af597fb29',
});

export const getUserById = (id: string) => usersApi.getById<IUser>(id);

export const getAllUsers = () => usersApi.getAll<IUser>();

export const createUser = (payload: IUser) => usersApi.create(payload);

export const deleteUser = (id: string) => usersApi.delete(id);

export const updateUser = (id: string, payload: Partial<IUser>) => usersApi.update(id, payload);
