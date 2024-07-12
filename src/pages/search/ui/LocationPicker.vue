<script setup lang="ts">
import { computed } from 'vue';
import { useTripSettingsStore } from 'stores/trip-settings';
import { storeToRefs } from 'pinia';
import { CITY_NAMES } from 'src/shared/constants';
import { MyItem } from 'src/shared/ui';

const props = defineProps<{ type: 'origin' | 'destination' }>();

const store = useTripSettingsStore();
const { origin, destination } = storeToRefs(store);

const availableLocations = computed(() => {
  if (props.type === 'origin') {
    return CITY_NAMES.filter((city) => city !== destination.value);
  }
  return CITY_NAMES.filter((city) => city !== origin.value);
});

const emit = defineEmits(['pick']);
</script>

<template>
  <q-card-section class="q-px-sm q-pt-none">
    <h4 class="q-mx-md q-mb-lg">{{ props.type === 'origin' ? 'Откуда едете?' : 'Куда едете?' }}</h4>
    <q-list>
      <my-item
        v-for="name in availableLocations"
        :key="name"
        :label="name"
        clickable
        chevron
        @click="emit('pick', name)"
      />
    </q-list>
  </q-card-section>
</template>
