<script setup lang="ts">
import { MyItem } from 'src/shared/ui';
import { ICityInfo } from 'pages/publish/index.vue';

const props = defineProps<{
  title: string,
  city: ICityInfo,
  options: string[]
}>();

const locationInputValue = ref(props.city.location);
</script>

<template>
  <div class="absolute full-width">
    <h4 class="q-ma-lg q-pb-sm">{{ title }}</h4>

    <q-input
      class="q-mx-lg q-mb-sm"
      v-model="locationInputValue"
      @update:model-value="$emit('locationInput', locationInputValue)"
      outlined
      maxlength="20"
      :prefix="`${city.city},`"
      placeholder="Ленина 24"
    />
    <q-list class="q-px-sm">
      <my-item
        v-for="option in options"
        :key="option"
        :label="option"
        :active="city.canDriveToPassengerLocation"
        chevron
        clickable
        @click="$emit('optionClick')"
      />
    </q-list>
  </div>
</template>
