import { CompodocEntity } from './compodoc-entity';

export interface CompodocInjectable extends CompodocEntity {
  properties: [];
  methods: unknown[];
  constructorObj: unknown;
}
