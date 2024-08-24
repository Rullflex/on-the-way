import { Prefix } from 'src/pages/login/const';

export const getUserEmail = (email: string | null) => {
  return email?.startsWith(Prefix.NO_EMAIL_VK) ? null : email;
};
