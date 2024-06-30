<script setup lang="ts">
import { MyItem, MyAvatar } from 'src/shared/ui';
</script>

<template>
  <q-page>
    <div class="text-h4 text-bold q-pa-lg">Входящие</div>

    <q-list>
      <my-item
        chevron
        label="Входящая заявка"
        caption="Сообщение о новой заявке"
      >
        <template #append>
          <my-avatar />
        </template>
      </my-item>
    </q-list>
  </q-page>
</template>
