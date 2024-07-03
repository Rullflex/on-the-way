<script setup lang="ts">
import { NamedColor } from 'quasar';

interface IProps {
  label: string;
  caption?: string;
  color?: NamedColor;
  icon?: string;
  chevron?: boolean;
}

const props = defineProps<IProps>();
</script>

<template>
  <q-item
    class="rounded-borders"
    :class="props.color && `text-${props.color}`"
  >
    <q-item-section
      v-if="props.icon"
      side
    >
      <q-icon
        :name="props.icon"
        :color="color"
      />
    </q-item-section>

    <slot v-if="$slots.default" />

    <q-item-section>
      <q-item-label>
        {{ props.label }}
      </q-item-label>

      <q-item-label
        v-if="props.caption"
        caption
      >
        {{ props.caption }}
      </q-item-label>
    </q-item-section>

    <slot
      v-if="$slots.append"
      name="append"
    />

    <q-item-section
      v-if="props.chevron"
      side
    >
      <q-icon name="eva-chevron-right-outline" />
    </q-item-section>
  </q-item>
</template>
