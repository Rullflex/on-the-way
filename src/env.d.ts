/* eslint-disable */

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    VUE_ROUTER_MODE: 'hash' | 'history' | 'abstract' | undefined;
    VUE_ROUTER_BASE: string | undefined;
    APP_WRITE_API_URL: string;
    APP_WRITE_PROJECT_ID: string;
    APP_HELP_MAIL_URL: string;
  }
}
