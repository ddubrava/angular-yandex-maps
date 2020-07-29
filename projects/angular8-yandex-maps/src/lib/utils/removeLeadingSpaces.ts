/**
 * Removes all leading spaces in the beggining on each line
 * @param str - string for replacing
 */
export const removeLeadingSpaces = (str: string): string => str.trim().replace(/^ +/gm, '');
