import { boot } from 'quasar/wrappers';
import { App } from 'vue';
import { vFocus } from 'src/directives/focus';

export default boot(({ app }: { app: App }) => {
  app.directive('focus', vFocus);
});
