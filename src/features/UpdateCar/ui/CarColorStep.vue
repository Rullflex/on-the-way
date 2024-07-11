<script setup lang="ts">
import { CAR_COLORS } from 'src/shared/constants';

const carColor = defineModel({ default: '' });
</script>

<template>
  <div>
    <h4 class="q-ma-lg">Какого цвета ваша машина?</h4>

    <q-list>
      <q-item
        v-for="item in CAR_COLORS"
        :key="item.color"
        clickable
        class="rounded-borders q-mx-sm"
        :active="item.color === carColor"
        @click="carColor = item.color"
      >
        <q-item-section side>
          <q-icon
            name="circle"
            :color="item.value"
          />
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ item.color }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-icon name="eva-chevron-right-outline"></q-icon>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>
