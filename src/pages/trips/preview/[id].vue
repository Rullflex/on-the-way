<script setup lang="ts">
import MyItem from 'src/shared/ui/MyItem.vue';
import { getPluralNoun } from 'src/shared/utils';
import { useTripsStore } from 'stores/trips';
import { MyBackBtn } from 'src/shared/ui';

const props = defineProps<{ id: string }>();
const tripId = computed(() => Number(props.id));
const tripsStore = useTripsStore();
const trip = computed(() => tripsStore.tripById(tripId.value));
</script>

<template>
  <q-layout>
    <q-page-container>
      <q-page
        v-if="trip"
        class="q-pb-lg q-pt-sm"
      >
        <my-back-btn
          fallback-route="/trips/list"
          class="q-ml-md q-mb-md"
        />

        <div class="q-px-lg">
          <h5 class="q-mb-lg">Чт 27 июня</h5>

          <div class="column">
            <span class="text-bold">Ленина 25 (автовокзал)</span>
            <span class="text-subtitle2">{{ trip.origin.place }}</span>
            <span class="text-subtitle2">{{ trip.origin.time }}</span>

            <q-icon
              name="eva-more-vertical-outline"
              class="q-my-sm"
            />

            <span class="text-bold">Довезу до места</span>
            <span class="text-subtitle2">{{ trip.destination.place }}</span>
            <span class="text-subtitle2">{{ trip.destination.time }}</span>
          </div>
        </div>

        <q-separator
          spaced="1rem"
          size="0.5rem"
        />

        <div class="q-px-lg">
          <span class="text-h6">{{ trip.price }} ₽</span> за 1 пассажира, осталось
          {{ trip.passengers - trip.reserved }}
          {{ getPluralNoun(trip.passengers - trip.reserved, 'место', 'места', 'мест') }}
        </div>

        <q-separator
          spaced="1rem"
          size="0.5rem"
        />

        <q-list class="q-px-sm">
          <my-item
            chevron
            :label="trip.driver.name"
            to="/profile/preview/1"
          >
            <template #append>
              <q-avatar
                color="grey-4"
                text-color="white"
                size="2.5rem"
              >
                <img :src="trip.driver.avatar" />
              </q-avatar>
            </template>
          </my-item>

          <q-item class="q-my-sm">
            <q-item-section>
              <q-btn
                dense
                outline
                size="0.8rem"
                padding="6px"
                label="Позвонить"
                icon="eva-phone-outline"
                :href="`tel:${trip.driver.phone}`"
              />
            </q-item-section>

            <q-item-section>
              <q-btn
                dense
                outline
                size="0.8rem"
                padding="6px"
                label="Написать"
                icon="eva-message-circle-outline"
              />
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label caption>Комментарий</q-item-label>
              <q-item-label>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque ipsa placeat magnam quas officia optio
                sit voluptates quaerat, suscipit laborum obcaecati accusamus doloremque omnis iure asperiores rerum
                quibusdam consectetur maxime!
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-separator
            spaced
            inset
          />

          <q-item>
            <q-item-section side>
              <q-icon name="eva-car-outline" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ trip.driver.car }}</q-item-label>
              <q-item-label caption
              >2010, черный
                <q-chip dense>A123BC45</q-chip>
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-separator
            spaced
            inset
          />

          <my-item
            icon="eva-cube-outline"
            label="Заберу посылки"
          />

          <my-item
            icon="eva-briefcase-outline"
            label="Можно с багажом"
          />
        </q-list>

        <q-separator
          spaced="1rem"
          size="0.5rem"
        />

        <q-list>
          <my-item
            color="primary"
            label="Поделиться поездкой"
          />

          <my-item
            color="primary"
            label="Пожаловаться на поездку"
          />
        </q-list>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<route lang="yaml">
meta:
  layout: blank
</route>
