<script setup lang="ts">
import { MyItem } from 'src/shared/ui';
import { ICityInfo } from 'stores/publish-settings';

const props = defineProps<{
  title: string,
  city: ICityInfo,
  options: string[]
}>();
const emit = defineEmits(['locationInput', 'optionClick', 'stepValidChange']);

const locationInputValue = ref(props.city.location);

onMounted(() => {
  emit('stepValidChange', props.city.location);
});
</script>

<template>
  <div class="q-pa-lg absolute full-width">
    <h4 class="q-mb-lg">{{ title }}</h4>

    <q-input
      v-model="locationInputValue"
      @update:model-value="$emit('locationInput', locationInputValue)"
      outlined
      maxlength="20"
      :prefix="`${city.city},`"
      placeholder="Ленина 24"
    />

    <my-item
      v-for="option in options"
      :key="option"
      :label="option"
      chevron
      clickable
      @click="$emit('optionClick', option)"
    />
  </div>
</template>
