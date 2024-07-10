<script setup lang="ts">
import { MyBackBtn, MyAvatar, MyItem } from 'src/shared/ui';
import { useUserStore } from 'src/stores/user';
import { date as qDate } from 'quasar';
import { getPluralNoun } from 'src/shared/utils';

const userStore = useUserStore();
const age = computed(() => userStore.dateOfBirth && qDate.getDateDiff(new Date(), userStore.dateOfBirth, 'years'));
</script>

<template>
  <q-layout>
    <q-page-container>
      <q-page>
        <div class="sticky-top bg-white q-pa-md z-top">
          <my-back-btn fallback-route="/profile" />
        </div>

        <q-list class="q-px-sm">
          <q-item>
            <q-item-section>
              <q-item-label class="text-h5">{{ userStore.name }}</q-item-label>
              <q-item-label
                v-if="age"
                caption
                >{{ age }} {{ getPluralNoun(age, 'год', 'года', 'лет') }}</q-item-label
              >
            </q-item-section>

            <q-item-section avatar>
              <my-avatar size="5rem" />
            </q-item-section>
          </q-item>

          <my-item
            color="positive"
            icon="eva-done-all-outline"
            label="Профиль подтвержден"
          />

          <q-separator
            spaced
            inset
          />

          <q-item-label header>Личные данные</q-item-label>

          <my-item
            :label="userStore.phone ?? 'Не указан'"
            caption="Номер телефона"
          />
          <my-item
            :label="userStore.email ?? 'Не указан'"
            caption="Адрес эл. почты"
          />
        </q-list>

        <q-separator
          spaced="1rem"
          size="0.5rem"
        />

        <q-list class="q-px-sm">
          <my-item
            color="negative"
            label="Пожаловаться на пользователя"
          />
        </q-list>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<route lang="yaml">
meta:
  layout: blank
</route>
