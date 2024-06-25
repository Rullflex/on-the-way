<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useUserInfoStore } from 'src/stores/user-info';
import { computed } from 'vue';

const userInfoStore = useUserInfoStore();
const { name, surname, dateOfBirth, email, phone } = storeToRefs(userInfoStore);

const listItems = computed(() => [
  { label: 'Имя', value: name.value },
  { label: 'Фамилия', value: surname.value },
  { label: 'Дата рождения', value: dateOfBirth.value },
  { label: 'Адрес эл. почты', value: email.value },
  { label: 'Номер телефона', value: phone.value },
]);
</script>

<template>
  <q-layout>
    <q-page-container>
      <q-page class="q-pa-lg">
        <q-btn
          @click="$router.back()"
          icon="eva-arrow-back-outline"
          flat
          dense
          class="q-ml-xs"
        />

        <div class="text-h5 text-bold q-mb-lg q-mt-md q-ml-md">Редактирование профиля</div>

        <q-list>
          <!-- ANCHOR - Add Profile Photo -->
          <q-item
            clickable
            class="rounded-borders text-primary"
          >
            <q-item-section side>
              <q-icon
                color="primary"
                name="eva-plus-circle-outline"
              ></q-icon>
            </q-item-section>

            <q-item-section>Добавить фото профиля</q-item-section>

            <q-item-section avatar>
              <q-avatar
                color="grey-4"
                text-color="white"
                icon="eva-person"
                size="5rem"
              />
            </q-item-section>
          </q-item>

          <!-- ANCHOR - List Items -->
          <q-item
            v-for="item in listItems"
            :key="item.label"
            clickable
            class="rounded-borders"
          >
            <q-item-section>
              <q-item-label>{{ item.label }}</q-item-label>
              <q-item-label caption>{{ item.value }}</q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-icon name="eva-chevron-right-outline"></q-icon>
            </q-item-section>
          </q-item>
        </q-list>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
