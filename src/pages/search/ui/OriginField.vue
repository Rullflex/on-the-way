<script setup lang='ts'>
import { useTripSettingsStore } from 'stores/trip-settings';

const store = useTripSettingsStore();
const { origin } = storeToRefs(store);

const emit = defineEmits(['chooseOriginBtnClick'])
</script>

<template>
  <div
    class="q-px-lg q-pt-sm"
    @click="emit('chooseOriginBtnClick')"
  >
    <q-field
      label="Откуда"
      :stack-label="Boolean(origin)"
    >
      <template v-slot:prepend>
        <q-icon
          name="eva-pin-outline"
          size="1.3rem"
        />
      </template>

      <template v-slot:control>
        {{ origin }}
      </template>
    </q-field>
  </div>
</template>


