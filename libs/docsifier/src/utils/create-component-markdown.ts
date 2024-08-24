import * as fs from 'fs';
import { markdownTable } from 'markdown-table';
import * as path from 'path';
import dedent from 'ts-dedent';

import { CompodocComponent } from '../types/compodoc-component';
import { CompodocDirective } from '../types/compodoc-directive';
import { CompodocInput } from '../types/compodoc-input';
import { CompodocOutput } from '../types/compodoc-output';
import { formatDescription } from './format-description';

/**
 * Creates a decorator description from arguments.
 * Replaces all line breaks with spaces.
 * Removes all links.
 */
const createDecoratorDescription = (description: string): string =>
  description.replaceAll(/\n/g, ' ').replaceAll(/{@link.+}/g, '');

/**
 * Creates a decorator API reference from arguments.
 * Creates API references if they exist.
 */
const createDecoratorApiReference = (description: string): string => {
  const match = description.match(/{@link (.+)}/);

  if (!match) {
    return '—';
  }

  return match[1].replaceAll(/(.+\/(.+))/g, '[$2]($1)');
};

/**
 * Escapes all special chars that  break markdown tables.
 */
const escapeSpecialChars = (str: string) => {
  return str.replace(/\|/g, '\\|').replace(/</g, '\\<').replace(/>/g, '\\>');
};

/**
 * Creates a decorator table from cols and properties.
 */
const createDecoratorTable = (cols: string[], properties: (CompodocInput | CompodocOutput)[]) =>
  markdownTable([
    cols,
    ...properties.map(({ name, type, rawdescription = '' }) => [
      name,
      createDecoratorDescription(rawdescription),
      // Types can have < > |, all these chars break the table.
      escapeSpecialChars(type),
      createDecoratorApiReference(rawdescription),
    ]),
  ]);

/**
 * Creates a component markdown.
 */
export const createComponentMarkdown = (
  entity: CompodocComponent | CompodocDirective,
  /**
   * A root directory path where documentation is stored.
   */
  docsPath: string,
) => {
  const {
    name: entityName,
    rawdescription = '',
    inputsClass = [],
    outputsClass = [],
    exampleUrls = [],
  } = entity;

  const cols = ['Name', 'Description', 'Type', 'API Reference'];
  const inputsTable = createDecoratorTable(cols, inputsClass);
  const outputsTable = createDecoratorTable(cols, outputsClass);

  const markdown = dedent`
    # ${entityName}
    ${formatDescription(rawdescription)}

    ${
      exampleUrls[0]
        ? dedent`
          ## Example
          [filename](${exampleUrls[0]} ':include :type=iframe width=100% height=650px')
        `
        : ''
    }

    ${
      inputsClass.length
        ? dedent`
              ## Inputs
              ${inputsTable}
            `
        : ''
    }

    ${
      outputsClass.length
        ? dedent`
              ## Outputs
              ${outputsTable}
            `
        : ''
    }
  `;

  fs.writeFileSync(path.join(docsPath, 'components', `${entityName}.md`), markdown);
};
