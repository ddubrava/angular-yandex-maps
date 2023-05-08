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

  /**
   * compodoc can't parse @ symbol for variables, so we use \@ syntax,
   * and later remove the leading slash. We don't want to add this logic to formatDescription,
   * since it can break something.
   */
  const descriptionWithoutLeadingSlash = rawdescription.replace(/\\(?=@)/, '');

  const markdown = dedent`
    # ${name}
    ${formatDescription(descriptionWithoutLeadingSlash)}
  `;

  const path = `${DOCS_PATH}/variables/${name}.md`;
  fs.writeFileSync(path, markdown);
};
