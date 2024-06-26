export const formatByPhoneMask = (value: string) => {
  const PHONE_MASK = '+* (***) ***-**-**';
  const strippedValue = value.replace(/\D/g, '');
  const chars = strippedValue.split('');

  if (chars[0] === '8') {
    chars[0] = '7';
  }

  if (chars.length && chars[0] !== '7') {
    chars.unshift('7');
  }

  let count = 0;
  let formatted = '';
  for (let i = 0; i < PHONE_MASK.length; i++) {
    const c = PHONE_MASK[i];
    if (chars[count]) {
      if (/\*/.test(c)) {
        formatted += chars[count];
        count++;
      } else {
        formatted += c;
      }
    }
  }

  return formatted.slice(0, 18);
};
