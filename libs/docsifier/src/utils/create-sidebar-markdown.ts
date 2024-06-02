import * as fs from 'fs';
import * as path from 'path';
import dedent from 'ts-dedent';

import { docsPath } from '../const/docs-path';
import { CompodocEntity } from '../interfaces/compodoc-entity';
import { CompodocExportData } from '../interfaces/compodoc-export-data';

/**
 * Creates a string with Markdown links joined by \n.
 */
const createLinks = (entities: CompodocEntity[], path: string): string =>
  entities.map(({ name }) => `- [${name}](${path}/${name})`).join('\n');

/**
 * Creates a _sidebar.md file from passed data.
 */
export const createSidebarMarkdown = ({
  components,
  directives,
  injectables,
  interfaces,
  miscellaneous,
}: CompodocExportData) => {
  const markdown = dedent`
    - **Getting started**
      - [Quick start](/)
      - [Examples](/examples)
      - [FAQ](/faq)
    - **Components**
      ${createLinks([...components, ...directives], 'components')}
    - **Services**
      ${createLinks(injectables, 'services')}
    - **Interfaces**
      ${createLinks([...interfaces, ...miscellaneous.typealiases], 'interfaces')}
    - **Variables**
      ${createLinks(miscellaneous.variables, 'variables')}
  `;

  fs.writeFileSync(path.join(docsPath, '_sidebar.md'), markdown);
};
