import * as fs from 'fs';
import * as path from 'path';

import { docsPath } from '../const/docs-path';
import { libPath } from '../const/lib-path';

/**
 * Copies assets and the root README.md to DOCS_PATH.
 */
export const copyAssets = () => {
  const assetsPath = path.join(libPath, 'assets');
  const files = fs.readdirSync(assetsPath);

  files.forEach((file) => {
    fs.copyFileSync(path.join(assetsPath, file), path.join(docsPath, file));
  });

  fs.copyFileSync(path.join(process.cwd(), 'README.md'), path.join(docsPath, 'README.md'));
};
