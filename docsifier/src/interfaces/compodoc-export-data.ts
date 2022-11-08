import { CompodocComponent } from './compodoc-component';
import { CompodocDirective } from './compodoc-directive';
import { CompodocInjectable } from './compodoc-injectable';
import { CompodocInterface } from './compodoc-interface';
import { CompodocMiscellaneous } from './compodoc-miscellaneous';

export interface CompodocExportData {
  classes: any[];
  components: CompodocComponent[];
  coverage?: any[];
  directives: CompodocDirective[];
  guards: any[];
  injectables: CompodocInjectable[];
  interceptors: any[];
  interfaces: CompodocInterface[];
  miscellaneous: CompodocMiscellaneous;
  modules: any[];
  pipes: any[];
  routes: any[];
}
