import * as VKID from '@vkid/sdk';

VKID.Config.init({
  app: 52056885,
  redirectUrl: 'https://poputi.tech/login/vk-auth',
  mode: VKID.ConfigAuthMode.Redirect,
  scope: 'email phone',
});

export default VKID;
