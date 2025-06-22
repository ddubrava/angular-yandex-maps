import { CompodocEntity } from './compodoc-entity';

export interface CompodocModule extends CompodocEntity {
  bootstrap?: unknown[];
  declarations?: unknown[];
  exports?: unknown[];
  imports?: unknown[];
  routesTree?: unknown;
}
