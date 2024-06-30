<script setup lang="ts">
import { MyItem, MyAvatar } from 'src/shared/ui';
</script>

<template>
  <q-page>
    <h4 class="q-pa-lg">Входящие</h4>

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
