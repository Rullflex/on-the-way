import { getAgeString } from 'src/shared/utils';

export const calculateAge = (dateOfBirth: string | null) =>
  dateOfBirth
    ? ((birthDate, today, age) => (
      today.getMonth() < birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())
        ? getAgeString(age - 1)
        : getAgeString(age)
    ))(
      new Date(dateOfBirth),
      new Date(),
      new Date().getFullYear() - new Date(dateOfBirth).getFullYear()
    )
    : null;
