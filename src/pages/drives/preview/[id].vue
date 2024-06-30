<script setup lang="ts">
import MyItem from 'src/shared/ui/MyItem.vue';
import { getPluralNoun } from 'src/shared/utils';
import { useDrivesStore } from 'src/stores/drives';
import { computed } from 'vue';
import { MyBackBtn } from 'src/shared/ui';

const props = defineProps<{ id: string }>();
const driveId = computed(() => Number(props.id));
const drivesStore = useDrivesStore();
const drive = computed(() => drivesStore.driveById(driveId.value));
</script>

<template>
  <q-layout>
    <q-page-container>
      <q-page
        v-if="drive"
        class="q-pb-lg q-pt-sm"
      >
        <my-back-btn
          fallback-route="/drives/list"
          class="q-ml-md q-mb-md"
        />

        <div class="q-px-lg">
          <div class="text-h5 text-bold q-mb-lg">Чт 27 июня</div>

          <div class="column">
            <span class="text-bold">Ленина 25 (автовокзал)</span>
            <span class="text-subtitle2">{{ drive.origin.place }}</span>
            <span class="text-subtitle2">{{ drive.origin.time }}</span>

            <q-icon
              name="eva-more-vertical-outline"
              class="q-my-sm"
            />

            <span class="text-bold">Довезу до места</span>
            <span class="text-subtitle2">{{ drive.destination.place }}</span>
            <span class="text-subtitle2">{{ drive.destination.time }}</span>
          </div>
        </div>

        <q-separator
          spaced="1rem"
          size="0.5rem"
        />

        <div class="q-px-lg">
          <span class="text-h6 text-bold">{{ drive.price }} ₽</span> за 1 пассажира, осталось
          {{ drive.passengers - drive.reserved }}
          {{ getPluralNoun(drive.passengers - drive.reserved, 'место', 'места', 'мест') }}
        </div>

        <q-separator
          spaced="1rem"
          size="0.5rem"
        />

        <q-list>
          <my-item
            chevron
            :label="drive.driver.name"
          >
            <template #append>
              <q-avatar
                color="grey-4"
                text-color="white"
                size="2.5rem"
              >
                <img :src="drive.driver.avatar" />
              </q-avatar>
            </template>
          </my-item>

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

          <my-item
            chevron
            icon="eva-car-outline"
            :label="drive.driver.car"
            caption="2010, черный"
          />

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
