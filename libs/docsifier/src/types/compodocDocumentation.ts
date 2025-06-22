import { CompodocComponent } from './compodoc-component';
import { CompodocDirective } from './compodoc-directive';
import { CompodocFunction } from './compodoc-function';
import { CompodocInjectable } from './compodoc-injectable';
import { CompodocInterface } from './compodoc-interface';
import { CompodocMiscellaneous } from './compodoc-miscellaneous';

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
