<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useUserInfoStore } from 'src/stores/user-info';
import { computed } from 'vue';
import MyItem from 'src/ui/MyItem.vue';

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
          <my-item
            color="primary"
            icon="eva-plus-circle-outline"
            label="Добавить фото профиля"
          >
            <template #append>
              <q-item-section avatar>
                <q-avatar
                  color="grey-4"
                  text-color="white"
                  icon="eva-person"
                  size="5rem"
                />
              </q-item-section>
            </template>
          </my-item>

          <!-- ANCHOR - List Items -->
          <my-item
            v-for="item in listItems"
            chevron
            :key="item.label"
            :label="item.label"
            :caption="item.value"
          />
        </q-list>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
