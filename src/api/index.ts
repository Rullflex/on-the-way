import { Client, Databases, ID, Models, Query } from 'appwrite';

const DATABASE_ID = '66863b850005490bca32';

const client = new Client().setEndpoint(process.env.APP_WRITE_API_URL).setProject(process.env.APP_WRITE_PROJECT_ID);
const databases = new Databases(client);

type Document<T> = Models.Document & T;
type Payload<T> = Omit<Document<T>, keyof Models.Document>;

class AppWriteApi {
  private readonly databaseId: string;
  private readonly collectionId: string;

  constructor({ databaseId = DATABASE_ID, collectionId }: { databaseId?: string; collectionId: string }) {
    this.databaseId = databaseId;
    this.collectionId = collectionId;
  }

  getById<T>(id: string, queries?: string[]) {
    return databases.getDocument<Document<T>>(this.databaseId, this.collectionId, id, queries);
  }

  getAll<T>(queries?: string[]) {
    return databases.listDocuments<Document<T>>(this.databaseId, this.collectionId, queries);
  }

  create<T>(payload: Payload<T>, permissions?: string[]) {
    return databases.createDocument<Document<T>>(this.databaseId, this.collectionId, ID.unique(), payload, permissions);
  }

  update<T>(id: string, payload?: Payload<T>, permissions?: string[]) {
    return databases.updateDocument<Document<T>>(this.databaseId, this.collectionId, id, payload, permissions);
  }

  delete(id: string) {
    return databases.deleteDocument(this.databaseId, this.collectionId, id);
  }
}

export { AppWriteApi, Query };
