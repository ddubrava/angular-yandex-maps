/**
 * Generates a random string based on Date in hexadecimal numeral system
 * @example f175517fa4f3
 */
export const generateRandomId = (): string => {
  return `f${Number(new Date).toString(16)}`;
};
