import { CompodocEntity } from './compodoc-entity';

export interface CompodocModule extends CompodocEntity {
  bootstrap?: any[];
  declarations?: any[];
  exports?: any[];
  imports?: any[];
  routesTree?: any;
}
