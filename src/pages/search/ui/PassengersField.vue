<script setup lang="ts">
import { useTripSettingsStore } from 'stores/trip-settings';
import { storeToRefs } from 'pinia';

const store = useTripSettingsStore();
const { passengers } = storeToRefs(store);

const emit = defineEmits(['choosePassengersBtnClick']);
</script>

<template>
  <div
    class="col"
    @click="emit('choosePassengersBtnClick')"
  >
    <q-field
      label="Пассажиры"
      :stack-label="Boolean(passengers)"
    >
      <template v-slot:prepend>
        <q-icon
          name="eva-people-outline"
          size="1.3rem"
        />
      </template>

      <template v-slot:control>
        {{ passengers }}
      </template>
    </q-field>
  </div>
</template>
