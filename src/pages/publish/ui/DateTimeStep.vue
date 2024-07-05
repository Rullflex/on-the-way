<script setup lang="ts">
import DateTimeStepDialog from 'pages/publish/ui/DateTimeStepDialog.vue';

export type DialogType = 'date' | 'time'
const date = defineModel('date', { default: '' });
const time = defineModel('time', { default: '' });
const isDialogVisible = ref<boolean>(false);
const dialogType = ref<DialogType>('date');
const showDialog = (type: DialogType) => {
  isDialogVisible.value = true;
  dialogType.value = type;
};

</script>

<template>
  <div>
    <div class="absolute full-width">
      <h4 class="q-ma-lg">Введите дату и время отправления</h4>
      <div class="q-px-lg row gap-lg">
        <div
          class="col"
          @click="showDialog('date')"
        >
          <q-field
            label="Дата"
            :stack-label="Boolean(date)"
          >
            <template v-slot:prepend>
              <q-icon
                name="eva-calendar-outline"
                size="1.3rem"
              />
            </template>

            <template v-slot:control>
              {{ date }}
            </template>
          </q-field>
        </div>
        <div
          class="col"
          @click="showDialog('time')"
        >
          <q-field
            label="Время"
            :stack-label="Boolean(time)"
          >
            <template v-slot:prepend>
              <q-icon
                name="eva-clock-outline"
                size="1.3rem"
              />
            </template>

            <template v-slot:control>
              {{ time }}
            </template>
          </q-field>
        </div>
      </div>
    </div>
    <DateTimeStepDialog
      v-model:is-dialog-visible="isDialogVisible"
      v-model:date="date"
      v-model:time="time"
      :dialog-type="dialogType"
    />
  </div>
</template>
