import * as fs from 'fs';
import * as path from 'path';
import dedent from 'ts-dedent';

import { docsPath } from '../const/docs-path';
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

  fs.writeFileSync(path.join(docsPath, 'interfaces', `${name}.md`), markdown);
};
