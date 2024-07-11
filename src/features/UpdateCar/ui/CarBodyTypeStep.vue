<script setup lang="ts">
import { MyItem } from 'src/shared/ui';

const bodyType = defineModel({ default: '' });
</script>

<template>
  <div>
    <h4 class="q-ma-lg">Какой тип кузова у вашего авто?</h4>

    <q-list class="q-my-sm">
      <!-- TODO: Icons of body types for items -->
      <my-item
        v-for="type in ['Седан', 'Хэтчбэк', 'Легковой фургон', 'Универсал', 'Кроссовер', 'Минивэн']"
        :key="type"
        clickable
        chevron
        :label="type"
        :active="type === bodyType"
        class="q-mx-sm"
        @click="bodyType = type"
      />
    </q-list>
  </div>
</template>
