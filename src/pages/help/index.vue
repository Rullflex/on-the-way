<script lang="ts" setup>
import { MyItem } from 'src/shared/ui';

defineOptions({
  name: 'HelpPage',
});
</script>

<template>
  <q-page padding>
    <h4 class="q-px-md q-mb-lg">Помощь</h4>

    <q-list>
      <my-item
        chevron
        label="Как работает сервис"
      />
      <my-item
        chevron
        label="Вопросы и ответы"
        to="/help/faq"
      />
      <my-item
        chevron
        label="Связаться с нами"
        to="/contact-us"
      />
    </q-list>
  </q-page>
</template>

<route lang="yaml">
meta:
  layout: subPage
  fallbackRoute: '/profile'
</route>
