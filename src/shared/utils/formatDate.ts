type DateFormat = 'long';

const FORMAT_CONFIGS: Record<DateFormat, Intl.DateTimeFormatOptions> = {
  long: {
    weekday: 'short',
    month: 'long',
    day: 'numeric',
  },
};

export const formatDate = (date: string, format: DateFormat = 'long') => {
  return new Intl.DateTimeFormat('ru-RU', FORMAT_CONFIGS[format]).format(new Date(date));
};
