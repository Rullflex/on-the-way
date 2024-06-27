export const getPluralNoun = (n: number, one: string, two: string, five: string) => {
  n = Math.abs(n) % 100;
  const nMod10 = n % 10;
  const nMod100 = n % 100;
  if (nMod10 === 1 && nMod100 !== 11) {
    return one;
  }
  if (nMod10 >= 2 && nMod10 <= 4 && (nMod100 < 10 || nMod100 >= 20)) {
    return two;
  }
  return five;
};
