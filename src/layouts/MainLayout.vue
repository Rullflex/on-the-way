<script setup lang="ts">
defineOptions({
  name: 'MainLayout',
});

const navigation = [
  {
    title: 'Искать',
    icon: 'eva-search-outline',
    to: { name: 'search' },
  },
  {
    title: 'Опубликовать',
    icon: 'eva-plus-circle-outline',
  },
  {
    title: 'Ваши поездки',
    icon: 'eva-map-outline',
  },
  {
    title: 'Входящие',
    icon: 'eva-message-circle-outline',
  },
  {
    title: 'Профиль',
    icon: 'eva-person-outline',
    to: { name: 'profile' },
  },
];
</script>

<template>
  <q-layout>
    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer
      reveal
      bordered
      class="bg-white"
    >
      <nav :class="$style.nav">
        <ul :class="$style.list">
          <li
            v-for="item in navigation"
            :key="item.title"
            :class="$style.item"
          >
            <RouterLink
              :to="item.to || '/'"
              :class="$style.link"
              :active-class="$style.active"
            >
              <q-icon
                size="1.5rem"
                :name="item.icon"
              />
              <span :class="$style.label">{{ item.title }}</span>
            </RouterLink>
          </li>
        </ul>
      </nav>
    </q-footer>
  </q-layout>
</template>

<style lang="scss" module>
.nav {
  padding: 0.35rem 0 1rem;
}

.list {
  padding: 0;
  margin: 0;
  display: flex;
  list-style: none;

  display: flex;
}

.item {
  width: auto;
  min-width: 0;
  max-width: 100%;
  flex: 1;
  margin: 0;
  padding: 0.25rem;
}

.link {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.1rem;

  text-decoration: none;
  color: $blue-grey-8;

  &.active {
    color: $primary;
  }
}

.label {
  font-size: 0.56rem;
  font-weight: 500;
  margin-top: 0.25rem;
  line-height: 1;
  text-align: center;
}
</style>
