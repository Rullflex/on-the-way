import { ImageGravity } from 'appwrite';
import { AppWriteStorageApi } from 'src/plugins/appwrite';

const AVATARS_BUCKET_ID = '668ba9a800227ec77a0c';

export const avatarsApi = new AppWriteStorageApi({
  bucketId: AVATARS_BUCKET_ID,
});

export const uploadAvatar = (file: File) => avatarsApi.upload(file);

export const getAvatarURL = (fileId: string) =>
  avatarsApi.preview(fileId, {
    width: 100,
    height: 100,
    gravity: ImageGravity.Center,
    quality: 90,
  }).href;
