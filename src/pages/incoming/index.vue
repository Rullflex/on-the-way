<script setup lang="ts">
import { MyItem, MyAvatar } from 'src/shared/ui';
</script>

<template>
  <q-page>
    <h4 class="q-mx-lg q-mt-lg q-mb-md">Входящие</h4>

    <q-list class="q-px-sm">
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
