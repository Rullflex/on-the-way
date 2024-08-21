<script setup lang="ts">
import { Dialog } from 'quasar';

interface IEmits {
  (e: 'complete'): void;
  (e: 'cancel'): void;
}

const emit = defineEmits<IEmits>();

const handleButtonClick = (type: 'complete' | 'cancel') => {
  Dialog.create({
    title: 'Подтвердите действие',
    message: `Вы уверены, что хотите ${type === 'cancel' ? 'отменить' : 'завершить'} поездку?`,
    persistent: true,
    cancel: true,
  }).onOk(() => (type === 'cancel' ? emit('cancel') : emit('complete')));
};
</script>

<template>
  <q-btn
    outline
    unelevated
    size="md"
    color="negative"
    label="Отменить"
    padding="12px"
    icon="eva-slash-outline"
    @click="handleButtonClick('cancel')"
  />

  <q-btn
    outline
    unelevated
    size="md"
    color="positive"
    label="Завершить"
    padding="12px"
    icon="eva-checkmark-circle-2-outline"
    @click="handleButtonClick('complete')"
  />
</template>
