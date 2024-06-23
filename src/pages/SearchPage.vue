<script setup lang="ts">
import { ref } from 'vue';

type DialogType = 'origin' | 'destination' | 'date' | 'passengers';

const origin = ref('');
const destination = ref('');
const date = ref('');
const passengers = ref(1);

const isDialogVisible = ref<boolean>(false);
const dialogType = ref<DialogType>();

const availableLocationNames = ['Пермь', 'Кудымкар', 'Карагай', 'Юрла', 'Юсьва', 'Ленинск'];

const showDialog = (type: DialogType) => {
  isDialogVisible.value = true;
  dialogType.value = type;
};

const onOriginPicked = (name: string) => {
  origin.value = name;
  isDialogVisible.value = false;
};

const onDestinationPicked = (name: string) => {
  destination.value = name;
  isDialogVisible.value = false;
};

const onSearchClicked = () => {
  if (!origin.value) {
    showDialog('origin');
  } else if (!destination.value) {
    showDialog('destination');
  } else if (!date.value) {
    showDialog('date');
  } else if (!passengers.value) {
    showDialog('passengers');
  } else {
    console.log('Search clicked');
  }
};
</script>

<template>
  <q-page class="column justify-end bg-secondary">
    <!-- SECTION - Search Card -->
    <q-card style="border-bottom-right-radius: 0; border-bottom-left-radius: 0">
      <!-- ANCHOR - Origin Field -->
      <div
        class="q-px-lg q-pt-sm"
        @click="showDialog('origin')"
      >
        <q-field
          label="Откуда"
          :stack-label="Boolean(origin)"
        >
          <template v-slot:prepend>
            <q-icon
              name="eva-pin-outline"
              size="1.3rem"
            />
          </template>

          <template v-slot:control>
            {{ origin }}
          </template>
        </q-field>
      </div>

      <!-- ANCHOR - Destination Field -->
      <div
        class="q-px-lg"
        @click="showDialog('destination')"
      >
        <q-field
          label="Куда"
          :stack-label="Boolean(destination)"
        >
          <template v-slot:prepend>
            <q-icon
              name="eva-pin-outline"
              size="1.3rem"
            />
          </template>

          <template v-slot:control>
            {{ destination }}
          </template>
        </q-field>
      </div>

      <!-- ANCHOR - Date Field -->
      <div class="q-px-lg row gap-lg">
        <div
          class="col"
          @click="showDialog('date')"
        >
          <q-field
            label="Дата"
            :stack-label="Boolean(date)"
          >
            <template v-slot:prepend>
              <q-icon
                name="eva-calendar-outline"
                size="1.3rem"
              />
            </template>

            <template v-slot:control>
              {{ date }}
            </template>
          </q-field>
        </div>

        <!-- ANCHOR - Passengers Field -->
        <div
          class="col"
          @click="showDialog('passengers')"
        >
          <q-field
            label="Пассажиры"
            :stack-label="Boolean(passengers)"
          >
            <template v-slot:prepend>
              <q-icon
                name="eva-people-outline"
                size="1.3rem"
              />
            </template>

            <template v-slot:control>
              {{ passengers }}
            </template>
          </q-field>
        </div>
      </div>

      <div class="q-pa-lg">
        <!-- ANCHOR - Search Button -->
        <q-btn
          unelevated
          color="primary"
          class="full-width"
          @click="onSearchClicked"
          >Поиск
        </q-btn>
      </div>
    </q-card>
    <!-- !SECTION -->
  </q-page>

  <!-- SECTION - Full Sized Dialog -->
  <q-dialog
    maximized
    v-model="isDialogVisible"
  >
    <q-card>
      <!-- ANCHOR - Row with close button -->
      <q-card-section class="q-pb-none">
        <q-btn
          icon="eva-close"
          flat
          round
          dense
          v-close-popup
        />
      </q-card-section>

      <!-- ANCHOR - Location Picker -->
      <q-card-section v-if="dialogType === 'origin' || dialogType === 'destination'">
        <p class="text-h4 text-bold">{{ dialogType === 'origin' ? 'Откуда едете?' : 'Куда едете?' }}</p>

        <q-list
          separator
          padding
        >
          <q-item
            v-for="name in availableLocationNames"
            :key="name"
            clickable
            @click="dialogType === 'origin' ? onOriginPicked(name) : onDestinationPicked(name)"
          >
            <q-item-section>
              <q-item-label>{{ name }}</q-item-label>
            </q-item-section>

            <q-item-section avatar>
              <q-icon name="eva-chevron-right-outline"></q-icon>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>

      <!-- ANCHOR - Date Picker -->
      <q-card-section v-else-if="dialogType === 'date'">
        <p class="text-h4 text-bold">Когда вы едете?</p>

        <q-date
          v-model="date"
          flat
          minimal
          mask="ddd D.MM"
          class="full-width"
          :options="
            (date) => {
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              return new Date(date) >= today;
            }
          "
          @update:model-value="isDialogVisible = false"
        ></q-date>
      </q-card-section>

      <!-- ANCHOR - Passengers Picker -->
      <q-card-section v-else-if="dialogType === 'passengers'">
        <p class="text-h4 text-bold">Количество бронируемых мест</p>

        <div class="column items-center gap-lg q-pt-lg">
          <div class="row items-center">
            <q-btn
              icon="eva-minus-circle-outline"
              flat
              round
              dense
              @click="passengers > 1 && passengers--"
            />
            <div class="text-h1 text-bold q-px-md">{{ passengers }}</div>
            <q-btn
              icon="eva-plus-circle-outline"
              flat
              round
              dense
              @click="passengers++"
            />
          </div>

          <q-space />

          <q-btn
            color="primary"
            @click="isDialogVisible = false"
            >Подтвердить</q-btn
          >
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- !SECTION -->
</template>
