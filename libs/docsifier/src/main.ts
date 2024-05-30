import * as fs from 'fs';
import * as path from 'path';

import { docsPath } from './const/docs-path';
import { CompodocComponent } from './interfaces/compodoc-component';
import { CompodocDirective } from './interfaces/compodoc-directive';
import { CompodocExportData } from './interfaces/compodoc-export-data';
import { CompodocInjectable } from './interfaces/compodoc-injectable';
import { CompodocInterface } from './interfaces/compodoc-interface';
import { CompodocTypealias } from './interfaces/compodoc-typealias';
import { CompodocVariable } from './interfaces/compodoc-variable';
import { copyAssets } from './utils/copy-assets';
import { createComponentMarkdown } from './utils/create-component-markdown';
import { createInterfaceMarkdown } from './utils/create-interface-markdown';
import { createServiceMarkdown } from './utils/create-service-markdown';
import { createSidebarMarkdown } from './utils/create-sidebar-markdown';
import { createTypealiasMarkdown } from './utils/create-typealias-markdown';
import { createVariablesMarkdown } from './utils/create-variables-markdown';
import { readCompodocExportData } from './utils/read-compodoc-export-data';

const exportData: CompodocExportData = readCompodocExportData();

// Clear the dist directory
fs.rmSync(docsPath, { recursive: true, force: true });

// Create directories with the dist directory
fs.mkdirSync(docsPath);
fs.mkdirSync(path.join(docsPath, 'components'));
fs.mkdirSync(path.join(docsPath, 'services'));
fs.mkdirSync(path.join(docsPath, 'interfaces'));
fs.mkdirSync(path.join(docsPath, 'variables'));

copyAssets();

createSidebarMarkdown(exportData);

[...exportData.components, ...exportData.directives].forEach(
  (entity: CompodocComponent | CompodocDirective) => {
    createComponentMarkdown(entity);
  },
);

exportData.injectables.forEach((injectable: CompodocInjectable) => {
  createServiceMarkdown(injectable);
});

exportData.interfaces.forEach((entity: CompodocInterface) => {
  createInterfaceMarkdown(entity);
});

exportData.miscellaneous.variables.forEach((variable: CompodocVariable) => {
  createVariablesMarkdown(variable);
});

exportData.miscellaneous.typealiases.forEach((type: CompodocTypealias) => {
  createTypealiasMarkdown(type);
});
