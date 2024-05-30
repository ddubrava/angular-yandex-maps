import * as fs from 'fs';
import * as path from 'path';
import dedent from 'ts-dedent';

import { docsPath } from '../const/docs-path';
import { CompodocInterface } from '../interfaces/compodoc-interface';
import { formatDescription } from './format-description';

/**
 * Creates an interface markdown.
 */
export const createInterfaceMarkdown = (entity: CompodocInterface) => {
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
