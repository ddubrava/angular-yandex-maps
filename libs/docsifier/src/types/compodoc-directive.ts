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
  extends?: unknown;
  host?: string;
  hostBindings?: unknown[];
  hostListeners?: unknown[];
  implements?: unknown;
  inputs?: string[];
  inputsClass?: CompodocInput[];
  interpolation?: string;
  methodsClass?: unknown[];
  moduleId?: string;
  outputs?: string[];
  outputsClass?: CompodocOutput[];
  propertiesClass?: unknown[];
  queries?: unknown[];
  selector?: string;
  styleUrls?: string[];
  styles?: string[];
  template?: string;
  templateUrl?: string[];
  viewProviders?: unknown[];
}
