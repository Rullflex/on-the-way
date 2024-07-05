export const useTripsStore = defineStore('trips', {
  state: () => ({
    trips: [
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
        travelConveniences: {
          isAnimalsAvailable: true,
          isBaggageAvailable: false,
          isPackageAvailable: true,
          isChildSeatAvailable: true,
          hasAirCondition: false,
          twoInTheBack: true,
        },
        reserved: 1,
        passengers: 4,
        driver: {
          name: 'Алексей',
          car: 'TOYOTA COROLA XXL 22',
          licensePlate: 'А123ВС59',
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
        travelConveniences: {
          isAnimalsAvailable: false,
          isBaggageAvailable: true,
          isPackageAvailable: true,
          isChildSeatAvailable: false,
          hasAirCondition: true,
          twoInTheBack: true,
        },
        reserved: 2,
        passengers: 3,
        driver: {
          name: 'Алина',
          car: 'ВАЗ 1122',
          licensePlate: 'В456ЕР18',
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
        travelConveniences: {
          isAnimalsAvailable: true,
          isBaggageAvailable: true,
          isPackageAvailable: true,
          isChildSeatAvailable: false,
          hasAirCondition: false,
          twoInTheBack: false,
        },
        reserved: 7,
        passengers: 7,
        driver: {
          name: 'Мария',
          car: 'Jerry Tiger 2020',
          licensePlate: 'С789МН43',
          avatar: 'https://cdn.quasar.dev/img/avatar2.jpg',
          phone: '+7 (999) 999-99-99',
        },
      },
      {
        id: 4,
        price: '950',
        origin: {
          place: 'Киров',
          time: '09:00',
        },
        destination: {
          place: 'Сыктывкар',
          time: '12:00',
        },
        travelConveniences: {
          isAnimalsAvailable: true,
          isBaggageAvailable: false,
          isPackageAvailable: false,
          isChildSeatAvailable: true,
          hasAirCondition: true,
          twoInTheBack: true,
        },
        reserved: 2,
        passengers: 4,
        driver: {
          name: 'Иван',
          car: 'Ford Focus',
          licensePlate: 'К321ОР11',
          avatar: 'https://cdn.quasar.dev/img/avatar5.jpg',
          phone: '+7 (999) 123-45-67',
        },
      },
      {
        id: 5,
        price: '1200',
        origin: {
          place: 'Уфа',
          time: '08:00',
        },
        destination: {
          place: 'Самара',
          time: '14:00',
        },
        travelConveniences: {
          isAnimalsAvailable: false,
          isBaggageAvailable: true,
          isPackageAvailable: true,
          isChildSeatAvailable: false,
          hasAirCondition: true,
          twoInTheBack: false,
        },
        reserved: 3,
        passengers: 5,
        driver: {
          name: 'Ольга',
          car: 'Hyundai Solaris',
          licensePlate: 'А654ВК02',
          avatar: 'https://cdn.quasar.dev/img/avatar6.jpg',
          phone: '+7 (999) 234-56-78',
        },
      },
      {
        id: 6,
        price: '1100',
        origin: {
          place: 'Казань',
          time: '13:00',
        },
        destination: {
          place: 'Чебоксары',
          time: '16:00',
        },
        travelConveniences: {
          isAnimalsAvailable: true,
          isBaggageAvailable: true,
          isPackageAvailable: false,
          isChildSeatAvailable: true,
          hasAirCondition: false,
          twoInTheBack: true,
        },
        reserved: 4,
        passengers: 4,
        driver: {
          name: 'Сергей',
          car: 'Mazda 3',
          licensePlate: 'Е987ТП16',
          avatar: 'https://cdn.quasar.dev/img/avatar7.jpg',
          phone: '+7 (999) 345-67-89',
        },
      },
    ],
  }),
  getters: {
    tripById: (state) => (id: number) => {
      return state.trips.find((trip) => trip.id === id);
    },
  },
  actions: {},
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTripsStore, import.meta.hot));
}
