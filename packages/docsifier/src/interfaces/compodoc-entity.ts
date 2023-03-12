export interface CompodocEntity {
  id: string;
  name: string;
  type: string;
  subtype?: string;
  rawtype?: any;
  kind?: string;
  label?: string;
  file?: string;
  sourceCode?: string;
  deprecated?: boolean;
  deprecationMessage?: string;
  rawdescription?: string;
  description?: string;
}
