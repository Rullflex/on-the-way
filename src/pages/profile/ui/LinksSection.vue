<script setup lang="ts">
import { MyItem } from 'src/shared/ui';

const otherLinks = [
  {
    label: 'О проекте',
    to: '/about',
  },
  {
    label: 'Помощь',
    to: '/help',
  },
  {
    label: 'Оцените сервис',
    to: '/rate-us',
  },
  {
    label: 'Пользовательское соглашение',
    to: '',
  },
];
</script>

<template>
  <my-item
    v-for="link in otherLinks"
    :key="link.label"
    :label="link.label"
    :to="link.to"
    clickable
    chevron
  />
</template>
