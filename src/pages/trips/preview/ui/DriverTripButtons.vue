<script setup lang="ts">
import { Dialog } from 'quasar';
import { TripStatus } from 'src/shared/constants';

const enum Message {
  CANCEL = 'Вы уверены, что хотите отменить поездку? Это действие необратимо! Пользователи увидят что поездка не состоится.',
  PAUSE = 'Вы уверены, что хотите приостановить поездку? Поездка не будет показываться в поиске для новых пассажиров. Но для уже забронированных пользователей поездка останется активной.',
}

interface IEmits {
  (e: 'pause'): void;
  (e: 'unpause'): void;
  (e: 'cancel'): void;
}

defineProps<{
  status: TripStatus;
}>();

const emit = defineEmits<IEmits>();

const handleButtonClick = (type: 'pause' | 'cancel') => {
  Dialog.create({
    title: 'Подтвердите действие',
    message: type === 'cancel' ? Message.CANCEL : Message.PAUSE,
    persistent: true,
    cancel: true,
  }).onOk(() => (type === 'cancel' ? emit('cancel') : emit('pause')));
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
    v-if="status === TripStatus.PAUSED"
    outline
    color="green"
    unelevated
    size="md"
    label="Возобновить"
    padding="12px"
    icon="eva-sync-outline"
    @click="emit('unpause')"
  />

  <q-btn
    v-else
    outline
    unelevated
    size="md"
    label="Остановить"
    padding="12px"
    icon="eva-pause-circle-outline"
    @click="handleButtonClick('pause')"
  />
</template>
