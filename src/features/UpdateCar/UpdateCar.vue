<script setup lang="ts">
import { MyBackBtn } from 'src/shared/ui';
import { useStep } from 'src/shared/hooks/useStep';
import { getCarById, getUserById } from 'src/shared/api';
import { ICar } from 'src/shared/types';
import { captureApiException } from 'src/shared/utils';
import LicensePlateStep from 'src/features/UpdateCar/ui/LicensePlateStep.vue';
import UiPopupCloseButton from 'src/shared/ui/UiPopupCloseButton.vue';
import CarModelStep from 'src/features/UpdateCar/ui/CarModelStep.vue';
import BodyTypeStep from 'src/features/UpdateCar/ui/BodyTypeStep.vue';
import ColorStep from 'src/features/UpdateCar/ui/ColorStep.vue';
import YearStep from 'src/features/UpdateCar/ui/YearStep.vue';
import UiPageButton from 'src/shared/ui/UiPageButton.vue';
import UiNextStepButton from 'src/shared/ui/UiNextStepButton.vue';
import { useUserStore } from 'stores/user';

enum StepsNames {
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
  (e: 'updated', payload: ICar): void;
}

const props = defineProps<IProps>();
const emit = defineEmits<IEmits>();

const $q = useQuasar();
const { currentStep, stepAnimationName } = useStep(StepsNames.LicensePlate);
const userStore = useUserStore();

const licensePlate = ref<string | null>();
const name = ref<string>('');
const bodyType = ref<string>('');
const color = ref<string>('');
const year = ref<string>('');

const isNextButtonVisible = computed(() => {
  if (currentStep.value === StepsNames.LicensePlate) {
    return Boolean(licensePlate.value || licensePlate.value === null);
  } else if (currentStep.value === StepsNames.Name) {
    return Boolean(name.value);
  } else if (currentStep.value === StepsNames.BodyType) {
    return Boolean(bodyType.value);
  } else if (currentStep.value === StepsNames.Color) {
    return Boolean(color.value);
  }

  return false;
});

const handleBodyTypeChoose = (type: string) => {
  bodyType.value = type;
  currentStep.value++;
};

const handleColorChoose = (carColor: string) => {
  color.value = carColor;
  currentStep.value++;
};

const handleSubmitBtnClick = async () => {
  const user = await getUserById(userStore.accountId);
  emit('updated', {
    licensePlate: licensePlate.value ?? '',
    name: name.value ?? '',
    bodyType: bodyType.value ?? '',
    color: color.value ?? '',
    year: parseInt(year.value) ?? 1000,
    user: user
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
    <UiPopupCloseButton
      v-if="currentStep === StepsNames.LicensePlate"
      class="q-ml-md q-mt-md"
    />

    <MyBackBtn
      v-else
      class="q-ml-md q-mt-md"
      @click="currentStep--"
    />

    <transition :name="stepAnimationName">
      <LicensePlateStep
        v-if="currentStep === StepsNames.LicensePlate"
        v-model="licensePlate"
        @option-click="() => {
        licensePlate = null
        currentStep++
        }"
      />

      <CarModelStep
        v-else-if="currentStep === StepsNames.Name"
        v-model="name"
      />

      <BodyTypeStep
        v-else-if="currentStep === StepsNames.BodyType"
        :current-body-type="bodyType"
        @item-click="handleBodyTypeChoose"
      />

      <ColorStep
        v-else-if="currentStep === StepsNames.Color"
        :current-color="color"
        @item-click="handleColorChoose"
      />

      <YearStep
        v-else-if="currentStep === StepsNames.Year"
        v-model="year"
      />
    </transition>

    <UiNextStepButton
      v-if="isNextButtonVisible"
      v-model="currentStep"
    />

    <UiPageButton
      v-else-if="currentStep === Object.values(StepsNames).pop() && String(year)?.length === 4 && Number(year) <= new Date().getFullYear()"
      label="Сохранить"
      @click="handleSubmitBtnClick"
    />
  </q-card>
</template>
