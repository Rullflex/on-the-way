<script lang="ts" setup>
import { Notify } from 'quasar';
import { useUserStore } from 'src/stores/user';

const text = ref('');
const isPending = ref(false);
const user = useUserStore();

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

const onSubmit = async () => {
  const body = new FormData();
  body.append('text', text.value);
  body.append('title', 'Отзыв с формы обратной связи');
  body.append('info', JSON.stringify(user.$state));

  try {
    isPending.value = true;
    await fetch('/mail.php', {
      method: 'POST',
      body,
    });

    // TODO: вместо уведомления заменить контент на сообщение и картинку об успешной отправке
    Notify.create({
      type: 'positive',
      message: props.successMessage,
      position: 'top',
    });
  } catch (error) {
    Notify.create({
      type: 'negative',
      message: 'Произошла ошибка. Повторите позже',
      position: 'top',
    });
  } finally {
    isPending.value = false;
  }
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
      :loading="isPending"
      unelevated
      color="primary"
      type="submit"
      label="Отправить"
      class="q-mt-auto"
    />
  </q-form>
</template>
