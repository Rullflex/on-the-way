<script setup lang="ts">
import { QInput } from 'quasar';
import { ref } from 'vue';
import { formatByPhoneMask } from 'src/shared/utils';

const model = defineModel<string | null>({ default: '' });
const qInputRef = ref<QInput | null>(null);

const onInput = (value: string | number | null) => {
  if (!value) {
    model.value = '';
  } else if (qInputRef.value) {
    value = String(value);
    const { nativeEl } = qInputRef.value;
    const caretPosition = formatByPhoneMask(value.slice(0, nativeEl.selectionStart ?? 0)).length;
    const formatted = formatByPhoneMask(value.toString());
    model.value = formatted;
    nativeEl.value = formatted;
    nativeEl.setSelectionRange(caretPosition, caretPosition);
  }
};

const phoneRule = (v: string) =>
  /^\+?[1-9]{1}[0-9]{0,2}[-\ ]?\(?[2-9]{1}\d{2}\)?[-\ ]?\d{3}[-\ ]?\d{2}[-\ ]?\d{2}$/.test(v) ||
  'Номер телефона некорректен';
</script>

<template>
  <q-input
    ref="qInputRef"
    :modelValue="model"
    outlined
    clearable
    lazy-rules
    placeholder="Номер телефона"
    :rules="[phoneRule]"
    @update:model-value="onInput"
  />
</template>
