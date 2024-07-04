<script setup lang="ts">
import { MyItem } from 'src/shared/ui';
import { ICityInfo } from 'stores/publish-settings';

const props = defineProps<{
  title: string,
  city: ICityInfo,
  cityList: string[],
}>();

const emit = defineEmits(['listItemClick', 'stepValidChange']);

onMounted(() => {
  emit('stepValidChange', props.city.city);
});

</script>

<template>
  <div class="absolute full-width">
    <h4 class="q-ma-lg">{{ title }}</h4>

    <q-list class="q-px-sm">
      <my-item
        v-for="name in cityList"
        :key="name"
        :label="name"
        :active="name === city.city"
        chevron
        clickable
        @click="$emit('listItemClick', name)"
      />
    </q-list>
  </div>
</template>
