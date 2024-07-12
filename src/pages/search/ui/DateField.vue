<script setup lang='ts'>
import { useTripSettingsStore } from 'stores/trip-settings';
import { date as QDateUtil } from 'quasar';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { MONTHS_NAMES_IN_GENITIVE } from 'src/shared/constants';

const store = useTripSettingsStore();
const { date } = storeToRefs(store);

const formattedDate = computed(() => {
  if (!date.value) {
    return '';
  }

  const [dayOfWeek, dayOfMonth, month] = QDateUtil.formatDate(date.value, 'ddd D M').split(' ');

  if (Number(dayOfMonth) === new Date().getDate()) {
    return 'Сегодня';
  } else if (Number(dayOfMonth) === new Date().getDate() + 1) {
    return 'Завтра';
  }

  return `${dayOfWeek}, ${dayOfMonth} ${MONTHS_NAMES_IN_GENITIVE[Number(month) - 1]}`;
});

const emit = defineEmits(['chooseDateBtnClick']);
</script>

<template>
  <div
    class="col"
    @click="emit('chooseDateBtnClick')"
  >
    <q-field
      label="Дата"
      :stack-label="Boolean(formattedDate)"
    >
      <template v-slot:prepend>
        <q-icon
          name="eva-calendar-outline"
          size="1.3rem"
        />
      </template>

      <template v-slot:control>
        {{ formattedDate }}
      </template>
    </q-field>
  </div>
</template>
