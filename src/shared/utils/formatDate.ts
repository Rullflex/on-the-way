export const formatDate = (date: string, format?: 'full' | 'long' | 'medium' | 'short') => {
  return new Intl.DateTimeFormat('ru-RU', { dateStyle: format }).format(new Date(date));
};
