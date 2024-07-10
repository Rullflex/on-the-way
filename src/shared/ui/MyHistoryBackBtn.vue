<script setup lang="ts">
import { RouteLocationRaw } from 'vue-router';

interface IProps {
  fallbackRoute?: RouteLocationRaw;
}

const router = useRouter();
const props = defineProps<IProps>();
const handleButtonClick = () => {
  if (!history.state.back && props.fallbackRoute) {
    router.push(props.fallbackRoute);
  } else {
    router.go(-1);
  }
};
</script>

<template>
  <q-btn
    flat
    dense
    icon="eva-arrow-back-outline"
    @click="handleButtonClick"
  />
</template>
