<script setup lang="ts">
import { CAR_COLORS } from 'src/shared/constants/carColors';
import UiStepContainer from 'src/shared/ui/UiStepContainer.vue';

defineProps<{
  currentColor: string
}>()

</script>

<template>
  <UiStepContainer>
    <h4 class="q-ma-lg">Какого цвета ваша машина?</h4>

    <q-list>
      <q-item
        v-for="item in CAR_COLORS"
        :key="item.name"
        clickable
        class="rounded-borders q-mx-sm"
        :active="item.name === currentColor"
        @click="$emit('itemClick', item.name)"
      >
        <q-item-section side>
          <q-icon
            name="circle"
            :color="item.value"
          />
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ item.name }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-icon name="eva-chevron-right-outline"></q-icon>
        </q-item-section>
      </q-item>
    </q-list>
  </UiStepContainer>
</template>
