<script setup lang="ts">
const extraLinks = ['Ваши отзывы', 'О проекте', 'Помощь', 'Оцените сервис', 'Пользовательское соглашение'];
</script>

<template>
  <q-page class="q-pa-lg">
    <q-list>
      <!-- ANCHOR - Personal Data -->
      <q-item
        clickable
        class="rounded-borders"
      >
        <q-item-section>
          <q-item-label class="text-h5 text-bold">Дмитрий</q-item-label>
          <q-item-label caption>Личные данные</q-item-label>
        </q-item-section>

        <q-item-section avatar>
          <q-avatar
            color="grey-4"
            text-color="white"
            icon="eva-person"
            size="5rem"
          />
        </q-item-section>

        <q-item-section side>
          <q-icon name="eva-chevron-right-outline"></q-icon>
        </q-item-section>
      </q-item>

      <!-- ANCHOR - Edit Profile -->
      <q-item
        clickable
        class="rounded-borders text-primary"
      >
        <q-item-section side>
          <q-icon
            color="primary"
            name="eva-edit-outline"
          ></q-icon>
        </q-item-section>
        <q-item-section>Редактировать профиль</q-item-section>
      </q-item>

      <q-separator class="q-my-md" />

      <!-- ANCHOR - Cars -->
      <q-item-label header>Машины</q-item-label>

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
        <q-item-section>Добавить авто</q-item-section>
      </q-item>

      <q-separator class="q-my-md" />

      <!-- ANCHOR - Extra Links -->
      <q-item
        clickable
        v-for="link in extraLinks"
        :key="link"
        class="rounded-borders"
      >
        <q-item-section>{{ link }}</q-item-section>
        <q-item-section side>
          <q-icon name="eva-chevron-right-outline"></q-icon>
        </q-item-section>
      </q-item>

      <q-separator class="q-my-md" />

      <!-- ANCHOR - Log Out -->
      <q-item
        clickable
        class="rounded-borders"
      >
        <q-item-section class="text-negative">Выйти</q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>
