import type { CompodocComponent } from './compodoc-component';
import type { CompodocDirective } from './compodoc-directive';
import type { CompodocFunction } from './compodoc-function';
import type { CompodocInjectable } from './compodoc-injectable';
import type { CompodocInterface } from './compodoc-interface';
import type { CompodocMiscellaneous } from './compodoc-miscellaneous';

export interface CompodocDocumentation {
  classes: unknown[];
  components: CompodocComponent[];
  coverage?: unknown[];
  directives: CompodocDirective[];
  functions: CompodocFunction[];
  guards: unknown[];
  injectables: CompodocInjectable[];
  interceptors: unknown[];
  interfaces: CompodocInterface[];
  miscellaneous: CompodocMiscellaneous;
  modules: unknown[];
  pipes: unknown[];
  routes: unknown[];
}
