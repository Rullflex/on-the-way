<script setup lang="ts">
import { MyBackBtn } from 'src/shared/ui';
import { useStep } from 'src/shared/hooks/useStep';
import { getCarById } from 'src/shared/api';
import { ICar } from 'src/shared/types';
import { captureApiException } from 'src/shared/utils';
import CarLicensePlateStep from 'src/features/UpdateCar/ui/CarLicensePlateStep.vue';
import CarModelNameStep from 'src/features/UpdateCar/ui/CarModelNameStep.vue';
import CarBodyTypeStep from 'src/features/UpdateCar/ui/CarBodyTypeStep.vue';
import CarColorStep from 'src/features/UpdateCar/ui/CarColorStep.vue';
import CarYearStep from 'src/features/UpdateCar/ui/CarYearStep.vue';

enum Steps {
  LicensePlate,
  Name,
  BodyType,
  Color,
  Year,
}

interface IProps {
  id?: string;
}

interface IEmits {
  (e: 'updated', payload: Omit<ICar, 'user'>): void;
}

const props = defineProps<IProps>();
const emit = defineEmits<IEmits>();

const $q = useQuasar();
const { currentStep, stepAnimationName } = useStep(Steps.LicensePlate);

const licensePlate = ref<string | null>();
const name = ref<string>('');
const bodyType = ref<string>('');
const color = ref<string>('');
const year = ref<string>('');

const isNextButtonVisible = computed<boolean>(() => {
  if (currentStep.value === Steps.LicensePlate || licensePlate.value === null) {
    return Boolean(licensePlate.value);
  } else if (currentStep.value === Steps.Name) {
    return Boolean(name.value);
  } else if (currentStep.value === Steps.BodyType) {
    return Boolean(bodyType.value);
  } else if (currentStep.value === Steps.Color) {
    return Boolean(color.value);
  }

  return false;
});

watch(licensePlate, () => {
  licensePlate.value = licensePlate.value?.toUpperCase() as string;
});

const handleFromSubmitButton = () => {
  emit('updated', {
    licensePlate: licensePlate.value ?? '',
    name: name.value ?? '',
    bodyType: bodyType.value ?? '',
    color: color.value ?? '',
    year: Number(year.value) ?? 1000
  });
};

onMounted(async () => {
  if (props.id) {
    $q.loading.show();
    await getCarById(props.id)
      .then((response) => {
        licensePlate.value = response.licensePlate;
        name.value = response.name;
        bodyType.value = response.bodyType;
        color.value = response.color;
        year.value = String(response.year);
      })
      .catch(captureApiException);
    $q.loading.hide();
  }
});
</script>

<template>
  <q-card>
    <q-btn
      v-if="currentStep === Steps.LicensePlate"
      v-close-popup
      flat
      dense
      icon="eva-close"
      class="q-ml-md q-mt-md"
    />

    <my-back-btn
      v-else
      @click="currentStep--"
      class="q-ml-md q-mt-md"
    />

    <transition :name="stepAnimationName">
      <CarLicensePlateStep
        v-if="currentStep === Steps.LicensePlate"
        v-model="licensePlate"
        @option-click="currentStep++"
        class="absolute full-width"
      />

      <CarModelNameStep
        v-else-if="currentStep === Steps.Name"
        v-model="name"
        class="absolute full-width"
      />

      <CarBodyTypeStep
        v-else-if="currentStep === Steps.BodyType"
        :current-body-type="bodyType"
        v-model="bodyType"
        @click="currentStep++"
        class="absolute full-width"
        style="padding-bottom: 66px"
      />

      <CarColorStep
        v-else-if="currentStep === Steps.Color"
        :current-color="color"
        v-model="color"
        @click="currentStep++"
        class="absolute full-width"
        style="padding-bottom: 66px"
      />

      <CarYearStep
        v-else-if="currentStep === Steps.Year"
        v-model="year"
        class="absolute full-width"
      />
    </transition>

    <q-btn
      v-if="isNextButtonVisible"
      fab
      icon="eva-arrow-forward-outline"
      color="primary"
      class="fixed-bottom-right q-ma-lg"
      @click="currentStep++"
    />

    <q-btn
      v-else-if="String(year)?.length === 4 && Number(year) <= new Date().getFullYear()"
      unelevated
      color="primary"
      label="Сохранить"
      class="fixed-bottom q-ma-lg"
      @click="handleFromSubmitButton"
    />
  </q-card>
</template>
