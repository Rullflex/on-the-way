<script lang="ts" setup>
import { VkOneTapButton } from './ui';

defineOptions({
  name: 'LoginPage',
});
</script>

<template>
  <q-layout>
    <q-page-container>
      <q-page class="q-pa-lg column justify-between">
        <h4 class="q-mb-xl text-center">Вход</h4>

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
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<route lang="yaml">
meta:
  layout: blank
</route>
