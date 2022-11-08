import { CompodocEntity } from './compodoc-entity';
import { CompodocInput } from './compodoc-input';
import { CompodocOutput } from './compodoc-output';

export interface CompodocDirective extends CompodocEntity {
  animations?: string[];
  changeDetection?: string;
  encapsulation?: string;
  entryComponents?: string;
  exampleUrls?: string[];
  exportAs?: string;
  extends?: any;
  host?: string;
  hostBindings?: any[];
  hostListeners?: any[];
  implements?: any;
  inputs?: string[];
  inputsClass?: CompodocInput[];
  interpolation?: string;
  methodsClass?: any[];
  moduleId?: string;
  outputs?: string[];
  outputsClass?: CompodocOutput[];
  propertiesClass?: any[];
  queries?: any[];
  selector?: string;
  styleUrls?: string[];
  styles?: string[];
  template?: string;
  templateUrl?: string[];
  viewProviders?: any[];
}
