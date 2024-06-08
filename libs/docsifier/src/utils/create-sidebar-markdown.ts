import * as fs from 'fs';
import * as path from 'path';
import dedent from 'ts-dedent';

import { CompodocEntity } from '../types/compodoc-entity';
import { CompodocDocumentation } from '../types/compodocDocumentation';

/**
 * Creates a string with Markdown links joined by \n.
 */
const createLinks = (entities: CompodocEntity[], path: string): string =>
  entities.map(({ name }) => `- [${name}](${path}/${name})`).join('\n');

/**
 * Creates a _sidebar.md file from passed data.
 */
export const createSidebarMarkdown = (
  data: CompodocDocumentation,
  /**
   * A root directory path where documentation is stored.
   */
  docsPath: string,
  /**
   * All links must be absolute; base path is a prefix.
   */
  baseUrl: string,
) => {
  const markdown = dedent`
    - **Getting started**
      - [Quick start](${baseUrl}/)
      - [Examples](${baseUrl}/examples)
      - [FAQ](${baseUrl}/faq)
    - **Components**
      ${createLinks([...data.components, ...data.directives], `${baseUrl}/components`)}
    - **Services**
      ${createLinks(data.injectables, `${baseUrl}/services`)}
    - **Interfaces**
      ${createLinks([...data.interfaces, ...data.miscellaneous.typealiases], `${baseUrl}/interfaces`)}
    - **Variables**
      ${createLinks(data.miscellaneous.variables, `${baseUrl}/variables`)}
  `;

  fs.writeFileSync(path.join(docsPath, '_sidebar.md'), markdown);
};
