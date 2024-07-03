export const useDrivesStore = defineStore('drives', {
  state: () => ({
    drives: [
      {
        id: 1,
        price: '900',
        origin: {
          place: 'Пермь',
          time: '10:00',
        },
        destination: {
          place: 'Кудымкар',
          time: '13:00',
        },
        reserved: 1,
        passengers: 4,
        driver: {
          name: 'Алексей',
          car: 'TOYOTA COROLA XXL 22',
          avatar: 'https://cdn.quasar.dev/img/avatar4.jpg',
          phone: '+7 (999) 999-99-99',
        },
      },
      {
        id: 2,
        price: '800',
        origin: {
          place: 'Юсьва',
          time: '11:00',
        },
        destination: {
          place: 'Карагай',
          time: '13:30',
        },
        reserved: 2,
        passengers: 3,
        driver: {
          name: 'Алина',
          car: 'ВАЗ 1122',
          avatar: 'https://cdn.quasar.dev/img/avatar3.jpg',
          phone: '+7 (999) 999-99-99',
        },
      },
      {
        id: 3,
        price: '1000',
        origin: {
          place: 'Юрла',
          time: '14:00',
        },
        destination: {
          place: 'Ленинск',
          time: '15:00',
        },
        reserved: 7,
        passengers: 7,
        driver: {
          name: 'Мария',
          car: 'Jerry Tiger 2020',
          avatar: 'https://cdn.quasar.dev/img/avatar2.jpg',
          phone: '+7 (999) 999-99-99',
        },
      },
    ],
  }),
  getters: {
    driveById: (state) => (id: number) => {
      return state.drives.find((drive) => drive.id === id);
    },
  },
  actions: {},
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDrivesStore, import.meta.hot));
}
