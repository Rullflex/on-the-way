<script setup lang="ts">
import { MyItem } from 'src/shared/ui';
</script>

<template>
  <q-page padding>
    <div class="q-pa-md row flex-center">
      <q-img
        noSpinner
        width="80%"
        src="~/assets/traveling.svg"
        style="max-width: 300px"
      />
    </div>

    <h4 class="q-px-md q-py-sm">Здесь появятся ваши будущие поездки.</h4>

    <p class="text-subtitle2 q-px-md q-pt-md q-pb-sm">
      Выбирайте из тысячи направлений или опубликуйте поездку, чтобы разделить расходы с&nbsp;попутчиками.
    </p>

    <MyItem
      chevron
      label="Архив поездок"
      to="/rides/archive"
    />
  </q-page>
</template>
