<template>
  <q-page class="q-pa-lg column justify-end gap-lg">
    <q-field
      class="col-12"
      label="Откуда"
    >
      <template v-slot:prepend>
        <q-icon
          name="eva-pin-outline"
          size="1.3rem"
        />
      </template>
    </q-field>

    <q-field label="Куда">
      <template v-slot:prepend>
        <q-icon
          name="eva-pin-outline"
          size="1.3rem"
        />
      </template>
    </q-field>

    <div class="row q-col-gutter-md">
      <div class="col">
        <q-field label="Дата">
          <template v-slot:prepend>
            <q-icon
              name="eva-calendar-outline"
              size="1.3rem"
            />
          </template>
        </q-field>
      </div>
      <div class="col">
        <q-field label="Пассажиры">
          <template v-slot:prepend>
            <q-icon
              name="eva-people-outline"
              size="1.3rem"
            />
          </template>
        </q-field>
      </div>
    </div>

    <q-btn
      unelevated
      color="primary"
      >Поиск</q-btn
    >
  </q-page>
</template>

<script setup lang="ts"></script>
