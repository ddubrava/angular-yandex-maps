import * as fs from 'fs';

import { DIST_PATH } from '../const/dist-path';
import { CompodocExportData } from '../interfaces/compodoc-export-data';

const COMPODOC_PATH = `${DIST_PATH}/compodoc/documentation.json`;

/**
 * Reads a compodoc source (export data) and returns an object.
 */
export const readCompodocExportData = (): CompodocExportData =>
  JSON.parse(fs.readFileSync(COMPODOC_PATH).toString());
