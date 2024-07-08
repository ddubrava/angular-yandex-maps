import * as fs from 'fs';
import * as path from 'path';
import dedent from 'ts-dedent';

import { CompodocVariable } from '../types/compodoc-variable';
import { formatDescription } from './format-description';

/**
 * Creates a variable markdown.
 */
export const createVariablesMarkdown = (
  variable: CompodocVariable,
  /**
   * A root directory path where documentation is stored.
   */
  docsPath: string,
) => {
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

  fs.writeFileSync(path.join(docsPath, 'variables', `${name}.md`), markdown);
};
