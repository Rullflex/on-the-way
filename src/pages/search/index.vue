<script setup lang="ts">
import { useDriveSettingsStore } from 'src/stores/drive-settings';
import { CITY_NAMES } from 'src/shared/constants';
import { MyItem } from 'src/shared/ui';
import { date as qDateUtil } from 'quasar';

type DialogType = 'origin' | 'destination' | 'date' | 'passengers' | 'time';

const router = useRouter();
const store = useDriveSettingsStore();
const { origin, destination, date, passengers, time } = storeToRefs(store);

const datePickerModel = ref<string>('');
const initialTimeSet = ref<boolean>(false);

watch(datePickerModel, (newValue) => {
  const [dayOfWeek, dayOfMonth, month] = newValue.split(' ');

  if (Number(dayOfMonth) === new Date().getDate()) {
    date.value = 'Сегодня';
  } else if (Number(dayOfMonth) === new Date().getDate() + 1) {
    date.value = 'Завтра';
  } else {
    const monthIndex = Number(month) - 1;
    const monthNames = [
      'января',
      'февраля',
      'марта',
      'апреля',
      'мая',
      'июня',
      'июля',
      'августа',
      'сентября',
      'октября',
      'ноября',
      'декабря',
    ];

    date.value = `${dayOfWeek} ${dayOfMonth} ${monthNames[monthIndex]}`;
  }
});

onMounted(() => {
  if (!initialTimeSet.value && !time.value) {
    time.value = qDateUtil.formatDate(new Date(), 'HH:mm');
    initialTimeSet.value = true;
  }
});

const isDialogVisible = ref<boolean>(false);
const dialogType = ref<DialogType>();

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
    router.push('/drives/list');
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

      <!-- ANCHOR - Time Field -->
      <div
        class="q-px-lg"
        @click="showDialog('time')"
      >
        <q-field
          label="Время отбытия"
          :stack-label="Boolean(time)"
        >
          <template v-slot:prepend>
            <q-icon
              name="eva-clock-outline"
              size="1.3rem"
            />
          </template>

          <template v-slot:control>
            {{ time }}
          </template>
        </q-field>
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
    <q-card class="column">
      <!-- ANCHOR - Row with close button -->
      <q-card-section class="sticky-top bg-white z-top">
        <q-btn
          v-close-popup
          icon="eva-close"
          flat
          round
          dense
        />
      </q-card-section>

      <!-- ANCHOR - Location Picker -->
      <q-card-section
        v-if="dialogType === 'origin' || dialogType === 'destination'"
        class="q-px-sm q-pt-none"
      >
        <h4 class="q-mx-md q-mb-md">{{ dialogType === 'origin' ? 'Откуда едете?' : 'Куда едете?' }}</h4>

        <q-list>
          <my-item
            v-for="name in CITY_NAMES"
            :key="name"
            :label="name"
            clickable
            chevron
            @click="dialogType === 'origin' ? onOriginPicked(name) : onDestinationPicked(name)"
          />
        </q-list>
      </q-card-section>

      <!-- ANCHOR - Date Picker -->
      <q-card-section
        v-else-if="dialogType === 'date'"
        class="q-px-none q-pt-none"
      >
        <h4 class="q-mx-lg q-mb-md">Когда вы едете?</h4>

        <q-date
          v-model="datePickerModel"
          flat
          minimal
          mask="ddd D M"
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
      <q-card-section
        v-else-if="dialogType === 'passengers'"
        class="q-px-lg q-pt-none col column justify-between"
      >
        <h4>Количество бронируемых мест</h4>

        <div class="column items-center gap-lg">
          <div class="row items-center">
            <q-btn
              flat
              dense
              icon="eva-minus-circle-outline"
              @click="passengers > 1 && passengers--"
            />

            <div
              class="text-h1 text-bold q-px-md row flex-center"
              style="width: 100px"
            >
              {{ passengers }}
            </div>

            <q-btn
              flat
              dense
              icon="eva-plus-circle-outline"
              @click="passengers++"
            />
          </div>
        </div>

        <q-btn
          unelevated
          color="primary"
          label="Подтвердить"
          @click="isDialogVisible = false"
        />
      </q-card-section>

      <!-- ANCHOR - Time Picker -->
      <q-card-section
        v-else-if="dialogType === 'time'"
        class="q-px-lg q-pt-none column col gap-lg"
      >
        <h4>Во сколько вы планируете выехать?</h4>

        <q-input
          v-model="time"
          type="time"
          outlined
        />

        <q-btn
          unelevated
          color="primary"
          label="Подтвердить"
          class="q-mt-auto"
          @click="isDialogVisible = false"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- !SECTION -->
</template>
