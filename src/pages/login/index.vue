<script lang="ts" setup>
import { VkOneTapButton } from './ui';

defineOptions({
  name: 'LoginPage',
});

const helpMailUrl = process.env.APP_HELP_MAIL_URL;
</script>

<template>
  <q-layout>
    <q-page-container>
      <q-page class="q-pa-lg column justify-between">
        <h4 class="q-mb-xl text-center">Вход</h4>

        <q-img
          noSpinner
          src="~/assets/login.svg"
          style="max-width: 300px"
          class="self-center"
        />

        <div class="column gap-md">
          <VkOneTapButton />

          <q-btn
            unelevated
            no-caps
            dense
            outline
            padding="sm"
            color="primary"
            label="Войти по почте"
            class="text-weight-medium"
            icon="eva-at"
            to="/login/email"
          />

          <p class="text-body2 text-center">
            Проблемы со входом? Напишите нам:
            <a
              class="text-primary"
              :href="`mailto:${helpMailUrl}`"
              >{{ helpMailUrl }}</a
            >
          </p>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<route lang="yaml">
meta:
  layout: blank
</route>
