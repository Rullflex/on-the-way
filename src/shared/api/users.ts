import { AppWriteApi } from 'src/plugins/appwrite';
import { IUser } from 'src/shared/types';
import { getUserEmail } from '../utils';

export const usersApi = new AppWriteApi({
  collectionId: '6686cabb000af597fb29',
});

export const getUserById = (id: string) =>
  usersApi.getById<IUser>(id).then((response) => ({
    ...response,
    email: getUserEmail(response.email),
  }));

export const getAllUsers = () => usersApi.getAll<IUser>();

export const createUser = (payload: Partial<IUser>, customId?: string) => usersApi.create(payload, customId);

export const deleteUser = (id: string) => usersApi.delete(id);

export const updateUser = (id: string, payload: Partial<IUser>) => usersApi.update(id, payload);
