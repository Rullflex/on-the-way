export const getAgeString = (age: number): string => {
  const lastDigit = age % 10;
  const lastTwoDigits = age % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return `${age} лет`;
  } else if (lastDigit === 1) {
    return `${age} год`;
  } else if (lastDigit >= 2 && lastDigit <= 4) {
    return `${age} года`;
  } else {
    return `${age} лет`;
  }
};
