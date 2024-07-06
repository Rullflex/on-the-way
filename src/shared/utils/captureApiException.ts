import { AppwriteException } from 'appwrite';
import { Notify } from 'quasar';

export function captureApiException(error: AppwriteException) {
  Notify.create({
    position: 'top',
    color: 'negative',
    message: 'Произошла ошибка. Код: ' + error.code,
  });
}
