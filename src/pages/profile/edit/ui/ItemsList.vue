<script setup lang="ts">
import { MyItem } from 'src/shared/ui';
import { useUserStore } from 'stores/user';
import { IItemsList, ItemType } from '../types';

const userStore = useUserStore();
const { name, surname, birthday, email, phone } = storeToRefs(userStore);
const emit = defineEmits(['itemClick']);

const itemsList = computed<IItemsList[]>(() => [
  { label: 'Имя', value: name.value ?? '', type: ItemType.name },
  { label: 'Фамилия', value: surname.value ?? '', type: ItemType.surname },
  { label: 'Дата рождения', value: birthday.value, type: ItemType.dateOfBirth },
  { label: 'Адрес эл. почты', value: email.value ?? '', type: ItemType.email },
  { label: 'Номер телефона', value: phone.value ?? '', type: ItemType.phone },
]);
</script>

<template>
  <q-list>
    <my-item
      v-for="item in itemsList"
      chevron
      clickable
      :key="item.label"
      :label="item.value || 'Не указано'"
      :caption="item.label"
      @click="emit('itemClick', item.type)"
    />
  </q-list>
</template>
