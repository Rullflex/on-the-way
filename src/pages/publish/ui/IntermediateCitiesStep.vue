<script setup lang="ts">
import { MyItem } from 'src/shared/ui';

defineProps<{
  cityList: string[],
  hasIntermediateCity: (name: string) => boolean,
  toggleIntermediateCity: (name: string) => void
}>();

</script>

<template>
  <div
    class="q-pa-md absolute full-width"
  >
    <h5 class="q-mb-md">Добавьте промежуточные остановки, чтобы найти больше пассажиров</h5>

    <q-list>
      <my-item
        v-for="name in cityList"
        :icon="hasIntermediateCity(name) ? 'eva-checkmark-square-2-outline' : 'eva-square-outline'"
        :key="name"
        :label="name"
        clickable
        @click="toggleIntermediateCity(name)"
      />
    </q-list>
  </div>
</template>
