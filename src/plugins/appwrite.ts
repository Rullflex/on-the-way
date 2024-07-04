import { Client, Databases } from 'appwrite';

export const DATABASE_ID = '66863b850005490bca32';
export const CARS_COLLECTION_ID = '6686664d002982e9dffd';

export const client = new Client()
  .setEndpoint(process.env.APP_WRITE_API_URL)
  .setProject(process.env.APP_WRITE_PROJECT_ID);

export const databases = new Databases(client);
