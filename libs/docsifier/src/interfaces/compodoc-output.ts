import { CompodocEntity } from './compodoc-entity';

export interface CompodocOutput extends CompodocEntity {
  defaultValue: string;
  line: number;
}
