<script setup lang="ts">
import { MyBackBtn, MyItem } from 'src/shared/ui';
import { useStep } from 'src/shared/hooks/useStep';
import { getCarById } from 'src/shared/api';
import { ICar } from 'src/shared/types';
import { captureApiException } from 'src/shared/utils';

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
  (e: 'updated', payload: ICar): void;
}

const props = defineProps<IProps>();
const emit = defineEmits<IEmits>();

const $q = useQuasar();
const { currentStep, stepAnimationName } = useStep(Steps.LicensePlate);

const licensePlate = ref<string | null>();
const name = ref<string | null>();
const bodyType = ref<string | null>();
const color = ref<string | null>();
const year = ref<number | null>();

const isBtnNextVisible = computed<boolean>(() => {
  if (currentStep.value === Steps.LicensePlate) {
    return Boolean(licensePlate.value);
  } else if (currentStep.value === Steps.Name) {
    return Boolean(name.value);
  }

  return false;
});

onMounted(async () => {
  if (props.id) {
    $q.loading.show();
    await getCarById(props.id)
      .then((response) => {
        licensePlate.value = response.licensePlate;
        name.value = response.name;
        bodyType.value = response.bodyType;
        color.value = response.color;
        year.value = response.year;
      })
      .catch(captureApiException);
    $q.loading.hide();
  }
});
</script>

<template>
  <q-card>
    <!-- ANCHOR - Close/Back Button -->
    <q-card-section class="sticky-top bg-white z-top">
      <q-btn
        v-if="currentStep === Steps.LicensePlate"
        v-close-popup
        flat
        dense
        icon="eva-close"
      />

      <my-back-btn
        v-else
        @click="currentStep--"
      />
    </q-card-section>

    <transition :name="stepAnimationName">
      <!-- SECTION - Step License Plate -->
      <q-card-section
        v-if="currentStep === Steps.LicensePlate"
        tag="form"
        class="absolute q-px-sm q-pt-none"
        @submit.prevent="licensePlate && currentStep++"
      >
        <h4 class="q-mx-md q-mb-lg">Какой у машины регистрационный номер?</h4>

        <q-input
          v-model="licensePlate"
          outlined
          clearable
          maxlength="20"
          placeholder="А 123 БВ 45"
          class="q-mx-md"
        />

        <my-item
          v-show="!licensePlate?.length"
          chevron
          clickable
          class="q-mt-md"
          label="Я не знаю номер"
          @click="currentStep++"
        />
      </q-card-section>
      <!-- !SECTION -->

      <!-- SECTION - Step Car Name -->
      <q-card-section
        v-else-if="currentStep === Steps.Name"
        tag="form"
        class="absolute q-px-lg q-pt-none"
        @submit.prevent="name && currentStep++"
      >
        <h4 class="q-mb-lg">Какая у вас марка и модель машины?</h4>

        <q-input
          v-model="name"
          outlined
          clearable
          maxlength="20"
          placeholder="HYNDAI SOLARIS"
        />
      </q-card-section>
      <!-- !SECTION -->

      <!-- SECTION - Step Body Type -->
      <q-card-section
        v-else-if="currentStep === Steps.BodyType"
        class="absolute q-px-sm q-pt-none"
      >
        <h4 class="q-mx-md q-mb-lg">Какой тип кузова у вашего авто?</h4>

        <q-list>
          <!-- TODO: Icons of body types for items -->
          <my-item
            v-for="type in ['Седан', 'Хэтчбэк', 'Легковой фургон', 'Универсал', 'Кроссовер', 'Минивэн']"
            :key="type"
            clickable
            chevron
            :label="type"
            @click="
              bodyType = type;
              currentStep++;
            "
          />
        </q-list>
      </q-card-section>
      <!-- !SECTION -->

      <!-- SECTION - Step Car Color -->
      <q-card-section
        v-else-if="currentStep === Steps.Color"
        class="absolute q-px-sm q-pt-none"
      >
        <h4 class="q-mx-md q-mb-lg">Какого цвета ваша машина?</h4>

        <q-list>
          <q-item
            v-for="item in [
              { name: 'Белый', value: 'grey-1' },
              { name: 'Черный', value: 'black' },
              { name: 'Темно-серый', value: 'grey-7' },
              { name: 'Серый', value: 'grey-4' },
              { name: 'Вишневый', value: 'red-10' },
              { name: 'Красный', value: 'red' },
              { name: 'Темно-синий', value: 'blue' },
              { name: 'Синий', value: 'light-blue' },
              { name: 'Темно-зеленый', value: 'teal' },
              { name: 'Зеленый', value: 'green' },
              { name: 'Коричневый', value: 'brown' },
              { name: 'Бежевый', value: 'biege' },
              { name: 'Оранжевый', value: 'orange' },
              { name: 'Желтый', value: 'yellow' },
              { name: 'Фиолетовый', value: 'purple' },
              { name: 'Розовый', value: 'pink' },
            ]"
            :key="item.name"
            clickable
            class="rounded-borders"
            @click="
              color = item.name;
              currentStep++;
            "
          >
            <q-item-section side>
              <q-icon
                name="circle"
                :color="item.value"
              />
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ item.name }}</q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-icon name="eva-chevron-right-outline"></q-icon>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
      <!-- !SECTION -->

      <!-- SECTION - Step Car Year -->
      <q-card-section
        v-else-if="currentStep === Steps.Year"
        class="absolute q-px-lg q-pt-none"
      >
        <h4 class="q-mb-lg">Какого года выпуска ваша машина?</h4>

        <q-input
          v-model="year"
          outlined
          clearable
          inputmode="numeric"
          :rules="[
            (val) =>
              (val?.length === 4 && Number(val) <= new Date().getFullYear()) || 'Введите год в правильном формате',
          ]"
          placeholder="2000"
        />

        <!-- ANCHOR - Submit Button -->
        <q-btn
          v-if="String(year)?.length === 4 && Number(year) <= new Date().getFullYear()"
          unelevated
          color="primary"
          label="Сохранить"
          class="fixed-bottom q-ma-lg"
          @click="
            emit('updated', {
              licensePlate: licensePlate ?? '',
              name: name ?? '',
              bodyType: bodyType ?? '',
              color: color ?? '',
              year: Number(year) ?? 1000,
            })
          "
        />
      </q-card-section>
      <!-- !SECTION -->
    </transition>

    <!-- ANCHOR - Next Button -->
    <q-btn
      v-show="isBtnNextVisible"
      fab
      icon="eva-arrow-forward-outline"
      color="primary"
      class="fixed-bottom-right q-ma-lg"
      @click="currentStep++"
    />
  </q-card>
</template>
