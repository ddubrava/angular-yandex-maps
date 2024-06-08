import * as fs from 'fs';
import * as path from 'path';

import { CompodocComponent } from './types/compodoc-component';
import { CompodocDirective } from './types/compodoc-directive';
import { CompodocInjectable } from './types/compodoc-injectable';
import { CompodocInterface } from './types/compodoc-interface';
import { CompodocTypealias } from './types/compodoc-typealias';
import { CompodocVariable } from './types/compodoc-variable';
import { CompodocDocumentation } from './types/compodocDocumentation';
import { copyFiles } from './utils/copy-files';
import { createComponentMarkdown } from './utils/create-component-markdown';
import { createInterfaceMarkdown } from './utils/create-interface-markdown';
import { createServiceMarkdown } from './utils/create-service-markdown';
import { createSidebarMarkdown } from './utils/create-sidebar-markdown';
import { createTypealiasMarkdown } from './utils/create-typealias-markdown';
import { createVariablesMarkdown } from './utils/create-variables-markdown';
import { parseDocumentation } from './utils/parse-documentation';

const distPath = path.join(process.cwd(), 'dist');
const outputPath = path.join(distPath, 'docsify');
const assetsPath = path.join(process.cwd(), 'libs', 'docsifier', 'assets');

const create = (version: 'v2' | 'v3') => {
  const documentationPath = path.join(distPath, 'compodoc', version, 'documentation.json');
  const assetsPathWithVersion = path.join(assetsPath, version);
  const docsPathWithVersion = path.join(outputPath, version);
  const libraryPath = path.join(process.cwd(), 'libs', `angular-yandex-maps-${version}`);

  const documentation: CompodocDocumentation = parseDocumentation(documentationPath);

  // Create required directories
  fs.mkdirSync(docsPathWithVersion);
  fs.mkdirSync(path.join(docsPathWithVersion, 'components'));
  fs.mkdirSync(path.join(docsPathWithVersion, 'services'));
  fs.mkdirSync(path.join(docsPathWithVersion, 'interfaces'));
  fs.mkdirSync(path.join(docsPathWithVersion, 'variables'));

  // Copy libs' README, copy assets
  fs.copyFileSync(path.join(libraryPath, 'README.md'), path.join(docsPathWithVersion, 'README.md'));
  copyFiles(assetsPathWithVersion, docsPathWithVersion);

  createSidebarMarkdown(documentation, docsPathWithVersion, version);

  [...documentation.components, ...documentation.directives].forEach(
    (entity: CompodocComponent | CompodocDirective) => {
      createComponentMarkdown(entity, docsPathWithVersion);
    },
  );

  documentation.injectables.forEach((injectable: CompodocInjectable) => {
    createServiceMarkdown(injectable, docsPathWithVersion);
  });

  documentation.interfaces.forEach((entity: CompodocInterface) => {
    createInterfaceMarkdown(entity, docsPathWithVersion);
  });

  documentation.miscellaneous.variables.forEach((variable: CompodocVariable) => {
    createVariablesMarkdown(variable, docsPathWithVersion);
  });

  documentation.miscellaneous.typealiases.forEach((type: CompodocTypealias) => {
    createTypealiasMarkdown(type, docsPathWithVersion);
  });
};

fs.rmSync(outputPath, { recursive: true, force: true });
fs.mkdirSync(outputPath);

// Copy index files
copyFiles(path.join(assetsPath, 'index'), outputPath);

create('v2');
create('v3');
