import * as fs from 'fs';
import dedent from 'ts-dedent';

import { DOCS_PATH } from '../const/docs-path';
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

  const path = `${DOCS_PATH}/interfaces/${name}.md`;
  fs.writeFileSync(path, markdown);
};
