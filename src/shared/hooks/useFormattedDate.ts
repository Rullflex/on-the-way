import { date as QDateUtil } from 'quasar';
import { MONTHS_NAMES_IN_GENITIVE } from 'src/shared/constants';
import { Ref } from 'vue';

interface IOptions {
  shortcuts?: boolean;
}

const getDateData = (date: string) => {
  const [dayOfWeek, dayOfMonth, month, year] = QDateUtil.formatDate(date, 'ddd D M YYYY').split(' ');

  return { dayOfWeek, dayOfMonth, month, year };
};

export function useFormattedDate(dateRef: Ref<string> | Ref<null>, options: IOptions = { shortcuts: true }) {
  const shortFormatDate = computed(() => {
    if (!dateRef.value) {
      return '';
    }

    const { dayOfWeek, dayOfMonth, month } = getDateData(dateRef.value);

    if (options.shortcuts) {
      if (Number(dayOfMonth) === new Date().getDate()) {
        return 'Сегодня';
      } else if (Number(dayOfMonth) === new Date().getDate() + 1) {
        return 'Завтра';
      }
    }

    return `${dayOfWeek}, ${dayOfMonth} ${MONTHS_NAMES_IN_GENITIVE[Number(month) - 1]}`;
  });

  const fullFormatDate = computed(() => {
    if (!dateRef.value) {
      return '';
    }

    const { dayOfMonth, month, year } = getDateData(dateRef.value);

    return `${dayOfMonth} ${MONTHS_NAMES_IN_GENITIVE[Number(month) - 1]} ${year}`;
  });

  return { shortFormatDate, fullFormatDate };
}
