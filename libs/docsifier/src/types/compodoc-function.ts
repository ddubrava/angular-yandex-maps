export type CompodocFunction = {
  name: string;
  file: string;
  ctype: string;
  subtype: string;
  deprecated: boolean;
  deprecationMessage: string;
  description: string;
  args: {
    name: string;
    deprecated: boolean;
    deprecationMessage: string;
  }[];
  jsdoctags: {
    name: string;
    deprecated: boolean;
    deprecationMessage: string;
    tagName: {
      text: string;
    };
  }[];
};
