import { AppWriteApi } from 'src/plugins/appwrite';
import { IUser } from './types';

const api = new AppWriteApi({
  collectionId: '6686664d002982e9dffd',
});

export const getUserById = (id: string) => api.getById<IUser>(id);

export const getAllUsers = () => api.getAll<IUser>();

export const createUser = (payload: IUser) => api.create(payload);

export const deleteUser = (id: string) => api.delete(id);

export const updateUser = (id: string, payload: Partial<IUser>) => api.update(id, payload);
