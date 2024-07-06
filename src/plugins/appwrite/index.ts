import { Client, Databases, ID } from 'appwrite';
import { Response, Payload } from './types';

const DATABASE_ID = '66863b850005490bca32';

const client = new Client().setEndpoint(process.env.APP_WRITE_API_URL).setProject(process.env.APP_WRITE_PROJECT_ID);
const databases = new Databases(client);

export class AppWriteApi {
  private readonly databaseId: string;
  private readonly collectionId: string;

  constructor({ databaseId = DATABASE_ID, collectionId }: { databaseId?: string; collectionId: string }) {
    this.databaseId = databaseId;
    this.collectionId = collectionId;
  }

  getById<T>(id: string, queries?: string[]) {
    return databases.getDocument<Response<T>>(this.databaseId, this.collectionId, id, queries);
  }

  getAll<T>(queries?: string[]) {
    return databases.listDocuments<Response<T>>(this.databaseId, this.collectionId, queries);
  }

  create<T>(payload: Payload<T>, permissions?: string[]) {
    return databases.createDocument<Response<T>>(this.databaseId, this.collectionId, ID.unique(), payload, permissions);
  }

  update<T>(id: string, payload?: Payload<T>, permissions?: string[]) {
    return databases.updateDocument<Response<T>>(this.databaseId, this.collectionId, id, payload, permissions);
  }

  delete(id: string) {
    return databases.deleteDocument(this.databaseId, this.collectionId, id);
  }
}
