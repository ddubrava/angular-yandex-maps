import { CompodocEntity } from './compodoc-entity';

export interface CompodocVariable extends CompodocEntity {
  ctype: string;
  defaultValue: string;
}
