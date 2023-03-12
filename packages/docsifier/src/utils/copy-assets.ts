import * as fs from 'fs';

import { DOCS_PATH } from '../const/docs-path';

/**
 * Copies assets and the root README.md to DOCS_PATH.
 */
export const copyAssets = () => {
  const assetsPath = './assets';
  const files = fs.readdirSync(assetsPath);

  files.forEach((file) => {
    fs.copyFileSync(`${assetsPath}/${file}`, `${DOCS_PATH}/${file}`);
  });

  fs.copyFileSync('../../README.md', `${DOCS_PATH}/README.md`);
};
