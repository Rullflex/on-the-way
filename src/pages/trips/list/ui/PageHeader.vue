<script setup lang="ts">
import { getPluralNoun } from 'src/shared/utils';
import { useTripSettingsStore } from 'stores/trip-settings';
import { MyBackBtn } from 'src/shared/ui';
import { useFormattedDate } from 'src/shared/hooks/useFormattedDate';

const store = useTripSettingsStore();
const { origin, destination, date, passengers } = storeToRefs(store);
const { shortFormatDate } = useFormattedDate(date);
</script>

<template>
  <q-header
    reveal
    bordered
    class="bg-white text-dark row q-pa-md justify-between items-center"
  >
    <my-back-btn fallback-route="/search" />

    <div style="font-size: 0.75rem">
      <div class="row flex-center gap-xs">
        <span>{{ origin }}</span>
        <q-icon name="eva-arrow-forward-outline" />
        <span>{{ destination }}</span>
      </div>

      <div class="text-grey-8 text-center">
        {{ shortFormatDate }}, {{ passengers }} {{ getPluralNoun(passengers, 'пассажир', 'пассажира', 'пассажиров') }}
      </div>
    </div>

    <q-btn
      icon="eva-options-2-outline"
      flat
      dense
      @click="$emit('open-filters')"
    />
  </q-header>
</template>
