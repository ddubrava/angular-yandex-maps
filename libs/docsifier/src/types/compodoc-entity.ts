export interface CompodocEntity {
  id: string;
  name: string;
  type: string;
  subtype?: string;
  rawtype?: unknown;
  kind?: string;
  label?: string;
  file?: string;
  sourceCode?: string;
  deprecated?: boolean;
  deprecationMessage?: string;
  rawdescription?: string;
  description?: string;
}
