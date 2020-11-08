/**
 * Removes all Leading blank spaces from each line
 * @param s String for replacing
 */
export const removeLeadingSpaces = (s: string): string =>
  s.trim().replace(/^ +/gm, '');
