import * as fs from 'fs';
import * as path from 'path';
import dedent from 'ts-dedent';

import { CompodocEntity } from '../types/compodoc-entity';
import { CompodocDocumentation } from '../types/compodocDocumentation';

const sourceCodeDirectory = 'lib';

/**
 * Creates a string with Markdown links joined by \n.
 */
const createLinks = (entities: CompodocEntity[], path: string): string => {
  const filesByCategories: Record<string, string[]> = {};

  for (const { name, file } of entities) {
    const parts = file.split('/');

    const rootIndex = parts.indexOf(sourceCodeDirectory);

    // It's hardcoded as hell, but it's the only way to get this category.
    // +2 to skip lib/components.
    // -2 to skip the component directory.
    const category = parts.slice(rootIndex + 2, parts.length - 2)[0] ?? '';

    if (!filesByCategories[category]) {
      filesByCategories[category] = [];
    }

    filesByCategories[category].push(`- [${name}](${path}/${name})`);
  }

  const categories = Object.entries(filesByCategories).map(([category, items]) => {
    const itemLinks = items.map((item) => `  ${item}`).join('\n');

    if (category) {
      const categoryHeader = `- **${category}**`;

      return `${categoryHeader}\n${itemLinks}`;
    }

    return itemLinks;
  });

  return categories.join('\n');
};

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
