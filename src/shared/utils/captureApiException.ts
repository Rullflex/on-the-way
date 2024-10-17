import { AppwriteException } from 'appwrite';
import { Notify } from 'quasar';

const i18n = {
  'Invalid credentials. Please check the email and password.':
    'Неверные учетные данные. Проверьте адрес электронной почты и пароль.',
  'A user with the same id, email, or phone already exists in this project.':
    'Пользователь с таким идентификатором, почтой или телефоном уже существует.',
  'Invalid document structure: Attribute "email" has invalid format. Value must be a valid email address':
    'Неверная структура документа: Атрибут "email" имеет неверный формат. Значение должно быть действительным адресом электронной почты',
  'Creation of a session is prohibited when a session is active.': 'Создание сеанса запрещено, когда сеанс активен.',
  'The current user has been blocked. You can unblock the user by making a request to the User API\'s "Update User Status" endpoint or in the Appwrite Console\'s Auth section.':
    'Ваш аккаунт заблокирован. Вы можете написать в поддержку для уточнения причин блокировки',
};

export function captureApiException(error: AppwriteException) {
  Notify.create({
    position: 'top',
    color: 'negative',
    message: Reflect.has(i18n, error.message) ? Reflect.get(i18n, error.message) : error.message,
  });
}
