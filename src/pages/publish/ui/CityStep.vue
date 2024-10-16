<script setup lang="ts">
import { MyItem } from 'src/shared/ui';
import StepContainer from 'pages/publish/ui/StepContainer.vue';

defineProps<{
  title: string;
  cityName: string;
  cityList: string[];
}>();
</script>

<template>
  <StepContainer>
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
  </StepContainer>
</template>
