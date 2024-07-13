<script setup lang="ts">
import { useTripSettingsStore } from 'stores/trip-settings';
import OriginField from './ui/OriginField.vue';
import DestinationField from './ui/DestinationField.vue';
import DateField from './ui/DateField.vue';
import PassengersField from './ui/PassengersField.vue';
import SearchButton from './ui/SearchButton.vue';
import CloseButton from './ui/CloseButton.vue';
import LocationPicker from './ui/LocationPicker.vue';
import DatePicker from './ui/DatePicker.vue';
import PassengersPicker from './ui/PassengersPicker.vue';

type DialogType = 'origin' | 'destination' | 'date' | 'passengers';

const router = useRouter();
const store = useTripSettingsStore();
const { origin, destination, date, passengers } = storeToRefs(store);

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

const onDatePicked = () => {
  isDialogVisible.value = false;
};

const onPassengersPicked = () => {
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
    router.push('/trips/list');
  }
};
</script>

<template>
  <q-page class="column justify-end bg-secondary">
    <q-card style="border-bottom-right-radius: 0; border-bottom-left-radius: 0">
      <OriginField
        @choose-origin-btn-click="showDialog('origin')"
      />

      <DestinationField
        @choose-destination-btn-click="showDialog('destination')"
      />

      <div class="q-px-lg row gap-lg">
        <DateField
          @choose-date-btn-click="showDialog('date')"
        />

        <PassengersField
          @choose-passengers-btn-click="showDialog('passengers')"
        />
      </div>

      <SearchButton @click="onSearchClicked" />
    </q-card>
  </q-page>

  <q-dialog
    maximized
    v-model="isDialogVisible"
  >
    <q-card class="column">
      <CloseButton />

      <LocationPicker
        v-if="dialogType === 'origin' || dialogType === 'destination'"
        :type="dialogType === 'origin' ? 'origin' : 'destination'"
        @pick="dialogType === 'origin' ? onOriginPicked($event) : onDestinationPicked($event)"
      />

      <DatePicker
        v-else-if="dialogType === 'date'" @pick="onDatePicked"
      />

      <PassengersPicker
        v-else-if="dialogType === 'passengers'" @pick="onPassengersPicked"
      />
    </q-card>
  </q-dialog>
</template>
