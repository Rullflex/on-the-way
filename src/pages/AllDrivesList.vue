<script setup lang="ts">
const list = ['item 1', 'item 2', 'item 3', 'item 4', 'item 5', 'item 6', 'item 7', 'item 8', 'item 9', 'item 10'];
</script>

<template>
  <q-layout>
    <!-- SECTION - Header -->
    <q-header
      reveal
      bordered
      class="bg-white text-dark row q-pa-sm justify-between items-center"
    >
      <q-btn
        icon="eva-chevron-left-outline"
        flat
        dense
        :to="{ name: 'search' }"
      />

      <div style="font-size: 0.75rem">
        <div class="row flex-center gap-xs">
          <span>Пермь</span>
          <q-icon name="eva-arrow-forward-outline" />
          <span>Добрянка</span>
        </div>

        <div class="text-grey-8 text-center">Ср 26 июня, 1 пассажир</div>
      </div>

      <q-btn
        icon="eva-options-2-outline"
        flat
        dense
      />
    </q-header>
    <!-- !SECTION -->

    <q-page-container>
      <q-page class="bg-secondary">
        <div class="column gap-sm q-pa-lg full-height">
          <q-card
            v-for="item in list"
            :key="item"
          >
            <q-card-section>
              {{ item }}
            </q-card-section>
          </q-card>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
