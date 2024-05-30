import * as fs from 'fs';
import * as path from 'path';

import { distPath } from '../const/dist-path';
import { CompodocExportData } from '../interfaces/compodoc-export-data';

const compodocPath = path.join(distPath, 'compodoc', 'documentation.json');

/**
 * Reads a compodoc source (export data) and returns an object.
 */
export const readCompodocExportData = (): CompodocExportData =>
  JSON.parse(fs.readFileSync(compodocPath).toString());
