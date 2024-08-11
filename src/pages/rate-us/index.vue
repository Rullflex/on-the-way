<script lang="ts" setup>
import { FeedbackForm } from 'src/features/feedback-form';

defineOptions({
  name: 'RateUsPage',
});
</script>

<template>
  <q-page class="q-px-lg q-pb-lg column gap-lg">
    <div class="col-auto">
      <h4 class="q-mb-sm">Оценить сервис</h4>

      <p class="text-subtitle1">Мы обработаем оценку и по необходимости вернемся к Вам с обратной связью</p>
    </div>

    <feedback-form />
  </q-page>
</template>

<route lang="yaml">
meta:
  layout: subPage
  fallbackRoute: '/profile'
</route>
