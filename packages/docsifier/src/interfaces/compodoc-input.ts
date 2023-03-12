import { CompodocEntity } from './compodoc-entity';

export interface CompodocInput extends CompodocEntity {
  line: number;
  decorators: any[];
}
