import * as fs from 'fs';
import dedent from 'ts-dedent';

import { DOCS_PATH } from '../const/docs-path';
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

  const path = `${DOCS_PATH}/services/${name}.md`;
  fs.writeFileSync(path, markdown);
};
