<script setup lang="ts">
import { computed, ref } from 'vue';
import { CarInfo, useCarInfoStore } from 'src/stores/car-info';

enum Steps {
  LicensePlate,
  Name,
  BodyType,
  Color,
  Year,
}

interface IProps {
  id?: number;
}

interface IEmits {
  (e: 'updated', payload: Omit<CarInfo, 'id'>): void;
}

const props = defineProps<IProps>();
const emit = defineEmits<IEmits>();

const currentStep = ref(Steps.LicensePlate);

const licensePlate = ref<string | null>();
const name = ref<string | null>();
const bodyType = ref<string | null>();
const color = ref<string | null>();
const year = ref<string | null>();

const carInfoStore = useCarInfoStore();

if (props.id && carInfoStore.carById(props.id)) {
  const car = carInfoStore.carById(props.id);
  licensePlate.value = car?.licensePlate;
  name.value = car?.name;
  bodyType.value = car?.bodyType;
  color.value = car?.color;
  year.value = car?.year;
}

const isBtnNextVisible = computed<boolean>(() => {
  if (currentStep.value === Steps.LicensePlate) {
    return Boolean(licensePlate.value);
  } else if (currentStep.value === Steps.Name) {
    return Boolean(name.value);
  }

  return false;
});
</script>

<template>
  <q-card>
    <!-- ANCHOR - Close/Back Button -->
    <q-card-section class="q-pb-none">
      <q-btn
        v-if="currentStep === Steps.LicensePlate"
        v-close-popup
        icon="eva-close"
        flat
        dense
      />

      <q-btn
        v-else
        icon="eva-arrow-back-outline"
        flat
        dense
        @click="currentStep--"
      />
    </q-card-section>

    <transition name="slide-left">
      <!-- SECTION - Step License Plate -->
      <q-card-section
        v-if="currentStep === Steps.LicensePlate"
        tag="form"
        class="absolute-top"
        :style="{ top: '53px' }"
        @submit.prevent="licensePlate && currentStep++"
      >
        <div class="text-h4 text-bold q-mb-lg">Какой у машины регистрационный номер?</div>

        <q-input
          v-model="licensePlate"
          outlined
          clearable
          maxlength="20"
          placeholder="А 123 БВ 45"
        />

        <q-item
          v-show="!licensePlate?.length"
          clickable
          class="q-mt-md rounded-borders"
          @click="currentStep++"
        >
          <q-item-section>
            <q-item-label>Я не знаю номер</q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-icon name="eva-chevron-right-outline" />
          </q-item-section>
        </q-item>
      </q-card-section>
      <!-- !SECTION -->

      <!-- SECTION - Step Car Name -->
      <q-card-section
        v-else-if="currentStep === Steps.Name"
        tag="form"
        class="absolute-top"
        :style="{ top: '53px' }"
        @submit.prevent="name && currentStep++"
      >
        <div class="text-h4 text-bold q-mb-lg">Какая у вас марка и модель машины?</div>

        <q-input
          v-model="name"
          outlined
          clearable
          maxlength="20"
          placeholder="HYUNDAI SOLARIS"
        />
      </q-card-section>
      <!-- !SECTION -->

      <!-- SECTION - Step Body Type -->
      <q-card-section
        v-else-if="currentStep === Steps.BodyType"
        class="absolute-top"
        :style="{ top: '53px' }"
      >
        <div class="text-h4 text-bold q-mb-lg">Какой тип кузова у вашего авто?</div>

        <q-list>
          <!-- TODO: Icons of body types for items -->
          <q-item
            v-for="type in ['Седан', 'Хэтчбэк', 'Легковой фургон', 'Универсал', 'Кроссовер', 'Минивэн']"
            :key="type"
            clickable
            class="rounded-borders"
            @click="
              bodyType = type;
              currentStep++;
            "
          >
            <q-item-section>
              <q-item-label>{{ type }}</q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-icon name="eva-chevron-right-outline"></q-icon>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
      <!-- !SECTION -->

      <!-- SECTION - Step Car Color -->
      <q-card-section
        v-else-if="currentStep === Steps.Color"
        class="absolute-top"
        :style="{ top: '53px' }"
      >
        <div class="text-h4 text-bold q-mb-lg">Какого цвета ваша машина?</div>

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
        class="absolute-top"
        :style="{ top: '53px' }"
      >
        <div class="text-h4 text-bold q-mb-lg">Какого года выпуска ваша машина?</div>

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
          v-if="year?.length === 4 && Number(year) <= new Date().getFullYear()"
          unelevated
          label="Сохранить"
          color="primary"
          class="fixed-bottom q-ma-lg"
          @click="
            emit('updated', {
              licensePlate: licensePlate ?? '',
              name: name ?? '',
              bodyType: bodyType ?? '',
              color: color ?? '',
              year: year ?? '',
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
