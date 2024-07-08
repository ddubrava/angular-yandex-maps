import * as fs from 'fs';

import { CompodocDocumentation } from '../types/compodocDocumentation';

/**
 * Parses a JSON compodoc documentation.
 */
export const parseDocumentation = (documentationPath: string): CompodocDocumentation =>
  JSON.parse(fs.readFileSync(documentationPath).toString());
