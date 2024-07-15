<script setup lang="ts">
import { Dialog } from 'quasar';

interface IProps {
  isAlreadyReserved: boolean;
}

interface IEmits {
  (e: 'submit'): void;
}

const props = defineProps<IProps>();
const emit = defineEmits<IEmits>();

const buttonLabel = computed(() => (props.isAlreadyReserved ? 'Отменить бронирование' : 'Забронировать'));

const handleButtonClick = () => {
  Dialog.create({
    title: 'Подтвердите действие',
    message: `Вы уверены, что хотите ${props.isAlreadyReserved ? 'отменить бронь на' : 'забронировать'} поездку?`,
    persistent: true,
    cancel: true,
  }).onOk(() => emit('submit'));
};
</script>

<template>
  <q-btn
    size="md"
    unelevated
    :outline="props.isAlreadyReserved"
    :color="props.isAlreadyReserved ? 'negative' : 'primary'"
    :label="buttonLabel"
    @click="handleButtonClick"
  />
</template>
