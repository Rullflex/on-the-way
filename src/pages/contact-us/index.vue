<script lang="ts" setup>
import { MyItem } from 'src/shared/ui';

  const helpMailUrl = process.env.APP_HELP_MAIL_URL;
</script>

<template>
  <h4 class="q-px-lg q-mb-lg">Наши контакты</h4>

  <div class="flex flex-center q-py-lg">
    <q-img
      noSpinner
      width="80%"
      src="~/assets/contact-us.svg"
      style="max-width: 300px"
    />
  </div>
  

  <q-list>
    <my-item
      chevron
      color="primary"
      target="_blank"
      href="https://vk.com/im?media=&sel=-227205022"
      label="Написать в группу ВК"
    />

    <my-item
      chevron
      color="primary"
      :href="`mailto:${helpMailUrl}`"
      label="Написать на почту"
    />
  </q-list>
</template>

<route lang="yaml">
meta:
  layout: subPage
</route>
  
  