<script lang="ts" setup>
import { Notify } from 'quasar';

const text = ref('');

const props = withDefaults(
  defineProps<{
    textareaPlaceholder?: string;
    successMessage?: string;
  }>(),
  {
    textareaPlaceholder: 'Напишите Ваш развернутый отзыв',
    successMessage: 'Ваш отзыв успешно отправлен',
  }
);

const onSubmit = () => {
  // TODO: Отправка отзыва на почту

  // TODO: вместо уведомления заменить контент на сообщение и картинку об успешной отправке
  Notify.create({
    type: 'positive',
    message: props.successMessage,
    position: 'top',
  });
};
</script>

<template>
  <q-form
    class="column col-grow gap-md"
    @submit="onSubmit"
  >
    <q-input
      :placeholder="textareaPlaceholder"
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
</template>
