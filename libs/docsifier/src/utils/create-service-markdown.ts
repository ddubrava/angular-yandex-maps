import * as fs from 'fs';
import * as path from 'path';
import dedent from 'ts-dedent';

import { docsPath } from '../const/docs-path';
import { CompodocInjectable } from '../interfaces/compodoc-injectable';
import { formatDescription } from './format-description';

/**
 * Creates a service markdown.
 */
export const createServiceMarkdown = (injectable: CompodocInjectable) => {
  const { name, rawdescription = '' } = injectable;

  const markdown = dedent`
    # ${name}
    ${formatDescription(rawdescription)}
  `;

  fs.writeFileSync(path.join(docsPath, 'services', `${name}.md`), markdown);
};
