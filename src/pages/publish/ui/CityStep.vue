<script setup lang="ts">
import { MyItem } from 'src/shared/ui';

defineProps<{
  title: string,
  cityName: string,
  cityList: string[],
}>();

</script>

<template>
  <div class=" absolute full-width" style="padding-bottom: 74px">
    <h4 class="q-ma-lg">{{ title }}</h4>

    <q-list class="q-px-sm">
      <my-item
        v-for="name in cityList"
        :key="name"
        :label="name"
        :active="name === cityName"
        chevron
        clickable
        @click="$emit('listItemClick', name)"
      />
    </q-list>
  </div>
</template>

