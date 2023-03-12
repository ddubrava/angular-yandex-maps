/**
 * Formats a description by removing redundant elements.
 */
export const formatDescription = (description: string): string =>
  description.replaceAll(/<example-url>.+<\/example-url>|\t/g, '');
