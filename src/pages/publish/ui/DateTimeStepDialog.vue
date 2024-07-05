<script setup lang="ts">
import { DialogType } from 'pages/publish/ui/DateTimeStep.vue';

defineProps<{
  dialogType: DialogType
}>();

const isDialogVisible = defineModel('isDialogVisible', { default: false });
const date = defineModel('date', { default: '' });
const time = defineModel('time', { default: '' });

const datePickerModel = ref<string>('');

watch(datePickerModel, (newValue) => {
  const [dayOfWeek, dayOfMonth, month] = newValue.split(' ');

  if (Number(dayOfMonth) === new Date().getDate()) {
    date.value = 'Сегодня';
  } else if (Number(dayOfMonth) === new Date().getDate() + 1) {
    date.value = 'Завтра';
  } else {
    const monthIndex = Number(month) - 1;
    const monthNames = [
      'января',
      'февраля',
      'марта',
      'апреля',
      'мая',
      'июня',
      'июля',
      'августа',
      'сентября',
      'октября',
      'ноября',
      'декабря'
    ];

    date.value = `${dayOfWeek} ${dayOfMonth} ${monthNames[monthIndex]}`;
  }
});
</script>

<template>
  <q-dialog
    maximized
    v-model="isDialogVisible"
  >
    <q-card class="column">
      <!-- ANCHOR - Row with close button -->
      <q-card-section class="sticky-top bg-white z-top">
        <q-btn
          v-close-popup
          icon="eva-close"
          flat
          round
          dense
        />
      </q-card-section>

      <!-- ANCHOR - Date Picker -->
      <q-card-section
        v-if="dialogType === 'date'"
        class="q-px-none q-pt-none"
      >
        <h4 class="q-mx-lg q-mb-lg">Когда поездка?</h4>

        <q-date
          v-model="datePickerModel"
          flat
          minimal
          mask="ddd D M"
          class="full-width"
          :options="
                    (date) => {
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      return new Date(date) >= today;
                    }
                  "
          @update:model-value="isDialogVisible = false"
        ></q-date>
      </q-card-section>
      <q-card-section
        v-if="dialogType === 'time'"
        class="q-px-none q-pt-none"
      >
        <h4 class="q-mx-lg q-mb-lg">Во сколько заберете пассажиров?</h4>

        <q-time
          flat
          now-btn
          class="full-width"
          v-model="time"
        />

        <q-btn
          :disable="Boolean(!time)"
          class="full-width fixed-bottom"
          style="border-bottom-right-radius: 0; border-bottom-left-radius: 0"
          unelevated
          color="primary"
          label="Подтвердить"
          @click="isDialogVisible = false"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>


