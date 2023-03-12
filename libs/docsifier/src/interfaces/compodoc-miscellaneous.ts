import { CompodocEntity } from './compodoc-entity';
import { CompodocTypealias } from './compodoc-typealias';
import { CompodocVariable } from './compodoc-variable';

export interface CompodocMiscellaneous extends CompodocEntity {
  variables: CompodocVariable[];
  functions: any[];
  typealiases: CompodocTypealias[];
  enumerations: any[];
  groupedVariables: any[];
  groupedFunctions: any[];
  groupedEnumerations: any[];
  groupedTypeAliases: any[];
}
