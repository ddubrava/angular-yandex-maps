import * as fs from 'fs';
import dedent from 'ts-dedent';

import { DOCS_PATH } from '../const/docs-path';
import { CompodocTypealias } from '../interfaces/compodoc-typealias';
import { formatDescription } from './format-description';

/**
 * Creates a type alias markdown.
 */
export const createTypealiasMarkdown = (type: CompodocTypealias) => {
  const { name, description = '', rawtype } = type;

  const markdown = dedent`
    # ${name}
    ${formatDescription(description)}

    \`\`\`ts
    export type ${name} = ${rawtype}
    \`\`\`
  `;

  const path = `${DOCS_PATH}/interfaces/${name}.md`;
  fs.writeFileSync(path, markdown);
};
