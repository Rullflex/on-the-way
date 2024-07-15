<script setup lang='ts'>
import { useTripSettingsStore } from 'stores/trip-settings';
import { storeToRefs } from 'pinia';
import { useFormattedDate } from 'src/shared/hooks/useFormattedDate';

const store = useTripSettingsStore();
const { date } = storeToRefs(store);

const { shortFormatDate } = useFormattedDate(date);

const emit = defineEmits(['chooseDateBtnClick']);
</script>

<template>
  <div
    class="col"
    @click="emit('chooseDateBtnClick')"
  >
    <q-field
      label="Дата"
      :stack-label="Boolean(shortFormatDate)"
    >
      <template v-slot:prepend>
        <q-icon
          name="eva-calendar-outline"
          size="1.3rem"
        />
      </template>

      <template v-slot:control>
        {{ shortFormatDate }}
      </template>
    </q-field>
  </div>
</template>
