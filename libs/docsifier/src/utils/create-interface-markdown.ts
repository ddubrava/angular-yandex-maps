import * as fs from 'fs';
import * as path from 'path';
import dedent from 'ts-dedent';

import { CompodocInterface } from '../types/compodoc-interface';
import { formatDescription } from './format-description';

/**
 * Creates an interface markdown.
 */
export const createInterfaceMarkdown = (
  entity: CompodocInterface,
  /**
   * A root directory path where documentation is stored.
   */
  docsPath: string,
) => {
  const { name, rawdescription = '', sourceCode } = entity;

  const markdown = dedent`
    # ${name}
    ${formatDescription(rawdescription)}

    \`\`\`ts
    ${sourceCode}
    \`\`\`
  `;

  fs.writeFileSync(path.join(docsPath, 'interfaces', `${name}.md`), markdown);
};
