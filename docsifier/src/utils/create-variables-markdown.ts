import * as fs from 'fs';
import dedent from 'ts-dedent';

import { DOCS_PATH } from '../const/docs-path';
import { CompodocVariable } from '../interfaces/compodoc-variable';
import { formatDescription } from './format-description';

/**
 * Creates a variable markdown.
 */
export const createVariablesMarkdown = (variable: CompodocVariable) => {
  const { name, rawdescription = '' } = variable;

  const markdown = dedent`
    # ${name}
    ${formatDescription(rawdescription)}
  `;

  const path = `${DOCS_PATH}/variables/${name}.md`;
  fs.writeFileSync(path, markdown);
};
