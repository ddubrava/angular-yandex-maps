import type { CompodocEntity } from './compodoc-entity';
import type { CompodocTypealias } from './compodoc-typealias';
import type { CompodocVariable } from './compodoc-variable';

export interface CompodocMiscellaneous extends CompodocEntity {
  variables: CompodocVariable[];
  functions: unknown[];
  typealiases: CompodocTypealias[];
  enumerations: unknown[];
  groupedVariables: unknown[];
  groupedFunctions: unknown[];
  groupedEnumerations: unknown[];
  groupedTypeAliases: unknown[];
}
