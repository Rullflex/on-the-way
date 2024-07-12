<script setup lang='ts'>
import { useTripSettingsStore } from 'stores/trip-settings';

const store = useTripSettingsStore();
const { destination } = storeToRefs(store);

const emit = defineEmits(['chooseDestinationBtnClick']);
</script>

<template>
  <div
    class="q-px-lg"
    @click="emit('chooseDestinationBtnClick')"
  >
    <q-field
      label="Куда"
      :stack-label="Boolean(destination)"
    >
      <template v-slot:prepend>
        <q-icon
          name="eva-pin-outline"
          size="1.3rem"
        />
      </template>

      <template v-slot:control>
        {{ destination }}
      </template>
    </q-field>
  </div>
</template>
