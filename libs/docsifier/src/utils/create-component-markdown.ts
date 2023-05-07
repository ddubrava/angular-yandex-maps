import * as fs from 'fs';
import table from 'markdown-table';
import dedent from 'ts-dedent';

import { DOCS_PATH } from '../const/docs-path';
import { CompodocComponent } from '../interfaces/compodoc-component';
import { CompodocDirective } from '../interfaces/compodoc-directive';
import { CompodocInput } from '../interfaces/compodoc-input';
import { CompodocOutput } from '../interfaces/compodoc-output';
import { formatDescription } from './format-description';

/**
 * Creates a decorator description from arguments.
 * Replaces all line breaks with spaces.
 * Removes all links.
 */
const createDecoratorDescription = (description: string): string =>
  description.replaceAll(/\n/g, ' ').replaceAll(/{@link.+}/g, '');

/**
 * Creates a decorator type from arguments.
 * Replaces all | with a code not to break a table.
 * Creates documentation links for Ya interfaces.
 */
const createDecoratorType = (type: string): string => {
  const formatted = type.replaceAll(/\|/g, '&#124;');
  const match = formatted.match(/Ya.+?(?=<|$)/);

  if (!match) {
    return type;
  }

  return `[${match[0]}](interfaces/${match[0]})`;
};

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
 * Creates a decorator table from cols and properties.
 */
const createDecoratorTable = (cols: string[], properties: (CompodocInput | CompodocOutput)[]) =>
  table([
    cols,
    ...properties.map(({ name, type, rawdescription = '' }) => [
      name,
      createDecoratorDescription(rawdescription),
      createDecoratorType(type),
      createDecoratorApiReference(rawdescription),
    ]),
  ]);

/**
 * Creates a component markdown.
 */
export const createComponentMarkdown = (entity: CompodocComponent | CompodocDirective) => {
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

    ## Inputs
    ${inputsTable}

    ## Outputs
    ${outputsTable}
  `;

  const path = `${DOCS_PATH}/components/${entityName}.md`;
  fs.writeFileSync(path, markdown);
};
