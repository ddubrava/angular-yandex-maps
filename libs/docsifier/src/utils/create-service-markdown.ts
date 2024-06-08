import * as fs from 'fs';
import * as path from 'path';
import dedent from 'ts-dedent';

import { CompodocInjectable } from '../types/compodoc-injectable';
import { formatDescription } from './format-description';

/**
 * Creates a service markdown.
 */
export const createServiceMarkdown = (
  injectable: CompodocInjectable,
  /**
   * A root directory path where documentation is stored.
   */
  docsPath: string,
) => {
  const { name, rawdescription = '' } = injectable;

  const markdown = dedent`
    # ${name}
    ${formatDescription(rawdescription)}
  `;

  fs.writeFileSync(path.join(docsPath, 'services', `${name}.md`), markdown);
};
