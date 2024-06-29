import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/search',
  },
  {
    path: '/search',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'search',
        component: () => import('pages/SearchPage.vue'),
      },
    ],
  },
  {
    name: 'all-drives-list',
    path: '/all-drives-list',
    component: () => import('pages/AllDrivesList.vue'),
  },
  {
    name: 'drive-info',
    path: '/drive-info/:id',
    component: () => import('pages/DriveInfoPage.vue'),
  },
  {
    path: '/profile',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'profile',
        component: () => import('pages/ProfilePage.vue'),
      },
      {
        name: 'profile-edit',
        path: 'edit',
        component: () => import('pages/EditProfile.vue'),
      },
    ],
  },
  {
    name: 'car-info',
    path: '/profile/car-info/:id',
    component: () => import('pages/CarInfo.vue'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
