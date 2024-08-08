import { getPluralNoun } from 'src/shared/utils';
import { date as qDate } from 'quasar';

export const parseAge = (dateOfBirth: string) => {
  const years = qDate.getDateDiff(new Date(), dateOfBirth, 'years');
  return {
    years,
    age: `${years} ${getPluralNoun(years, 'год', 'года', 'лет')}`,
  };
};
