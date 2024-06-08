import * as fs from 'fs';
import * as path from 'path';
import dedent from 'ts-dedent';

import { CompodocTypealias } from '../types/compodoc-typealias';
import { formatDescription } from './format-description';

/**
 * Creates a type alias markdown.
 */
export const createTypealiasMarkdown = (
  type: CompodocTypealias,
  /**
   * A root directory path where documentation is stored.
   */
  docsPath: string,
) => {
  const { name, description = '', rawtype } = type;

  const markdown = dedent`
    # ${name}
    ${formatDescription(description)}

    \`\`\`ts
    export type ${name} = ${rawtype}
    \`\`\`
  `;

  fs.writeFileSync(path.join(docsPath, 'interfaces', `${name}.md`), markdown);
};
