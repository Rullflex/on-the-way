<script lang="ts" setup>
import { Notify } from 'quasar';

defineOptions({
  name: 'RateUsPage',
});

const text = ref('');

const onSubmit = () => {
  // TODO: Отправка отзыва на почту

  // TODO: вместо уведомления заменить контент на сообщение и картинку об успешной отправке
  Notify.create({
    type: 'positive',
    message: 'Ваш отзыв успешно отправлен',
    position: 'top',
  });
};
</script>

<template>
  <q-page class="q-px-lg q-pb-lg column gap-lg">
    <div class="col-auto">
      <h4 class="q-mb-sm">Оценить сервис</h4>

      <p class="text-subtitle1">Мы обработаем оценку и по необходимости вернемся к Вам с обратной связью</p>
    </div>

    <q-form
      class="column col-grow gap-md"
      @submit="onSubmit"
    >
      <q-input
        placeholder="Напишите Ваш развернутый отзыв"
        type="textarea"
        outlined
        maxlength="1000"
        counter
        v-model.trim="text"
        :rules="[(val) => !!val || 'Поле обязательно для заполнения']"
      />

      <q-btn
        unelevated
        color="primary"
        type="submit"
        label="Отправить"
        class="q-mt-auto"
      />
    </q-form>
  </q-page>
</template>

<route lang="yaml">
meta:
  layout: subPage
  fallbackRoute: '/profile'
</route>
