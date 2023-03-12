import { CompodocEntity } from './compodoc-entity';

export interface CompodocInjectable extends CompodocEntity {
  properties: [];
  methods: any[];
  constructorObj: any;
}
