type DateFormat = 'medium' | 'short';

const FORMAT_CONFIGS: Record<DateFormat, Intl.DateTimeFormatOptions> = {
  medium: {
    weekday: 'short',
    month: 'long',
    day: 'numeric',
  },
  short: {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  },
};

export const formatDate = (date: string, format: DateFormat | Intl.DateTimeFormatOptions = 'medium') => {
  const config = typeof format === 'string' ? FORMAT_CONFIGS[format] : format;
  return new Intl.DateTimeFormat('ru-RU', config).format(new Date(date));
};
