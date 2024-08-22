<script setup lang="ts">
import { useTripSettingsStore } from 'stores/trip-settings';
import {
  CloseButton,
  OriginField,
  DestinationField,
  DateField,
  PassengersField,
  SearchButton,
  LocationPicker,
  DatePicker,
  PassengersPicker,
} from './ui';

type DialogType = 'origin' | 'destination' | 'date' | 'passengers';

const router = useRouter();
const store = useTripSettingsStore();
const { origin, destination, date, passengers } = storeToRefs(store);

const isDialogVisible = ref<boolean>(false);
const dialogType = ref<DialogType>();

const swap = () => {
  const temp = origin.value;
  origin.value = destination.value;
  destination.value = temp;
};

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

const onPassengersPicked = (payload: number) => {
  passengers.value = payload;
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
    <q-img
      no-spinner
      width="90%"
      class="self-center"
      src="~/assets/through-the-park.svg"
    />

    <q-card style="border-bottom-right-radius: 0; border-bottom-left-radius: 0">
      <div class="row q-pl-lg q-pt-sm">
        <div class="col">
          <OriginField @choose-origin-btn-click="showDialog('origin')" />

          <DestinationField @choose-destination-btn-click="showDialog('destination')" />
        </div>

        <div class="col-auto column flex-center q-px-sm">
          <q-btn
            flat
            dense
            size="md"
            icon="eva-swap-outline"
            :style="{ transform: 'rotate(90deg)' }"
            @click="swap"
          />
        </div>
      </div>

      <div class="q-px-lg row gap-lg">
        <DateField @choose-date-btn-click="showDialog('date')" />

        <PassengersField @choose-passengers-btn-click="showDialog('passengers')" />
      </div>

      <SearchButton @click="onSearchClicked" />
    </q-card>
  </q-page>

  <q-dialog
    maximized
    v-model="isDialogVisible"
  >
    <q-card class="column no-wrap">
      <CloseButton />

      <LocationPicker
        v-if="dialogType === 'origin' || dialogType === 'destination'"
        :type="dialogType === 'origin' ? 'origin' : 'destination'"
        @pick="dialogType === 'origin' ? onOriginPicked($event) : onDestinationPicked($event)"
      />

      <DatePicker
        v-else-if="dialogType === 'date'"
        @pick="onDatePicked"
      />

      <PassengersPicker
        v-else-if="dialogType === 'passengers'"
        @pick="onPassengersPicked"
      />
    </q-card>
  </q-dialog>
</template>
