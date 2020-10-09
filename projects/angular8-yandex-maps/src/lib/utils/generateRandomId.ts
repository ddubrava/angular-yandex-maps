/**
 * Generates a random string in hexadecimal numeral system
 * @example f417e7be
 */
export const generateRandomId = (): string => {
  return `f${(~~(Math.random() * 1e8)).toString(16)}`;
};
