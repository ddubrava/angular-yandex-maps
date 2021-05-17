/**
 * -----------------------------------------------------
 * NOTES ON CONFIGURATION STRUCTURE
 * -----------------------------------------------------
 *
 * Out of the box, ESLint does not support TypeScript or HTML. Naturally those are the two
 * main file types we care about in Angular projects, so we have to do a little extra work
 * to configure ESLint exactly how we need to.
 *
 * Fortunately, ESLint gives us an 'overrides' configuration option which allows us to set
 * different lint tooling (parser, plugins, rules etc) for different file types, which is
 * critical because our .ts files require a different parser and different rules to our
 * .html (and our inline Component) templates.
 */
module.exports = {
  root: true,
  overrides: [
    {
      files: ['*.ts'],
      parserOptions: {
        project: ['tsconfig.json', 'e2e/tsconfig.json'],
        createDefaultProgram: true,
      },
      extends: [
        'plugin:@angular-eslint/recommended',
        'airbnb-typescript/base',
        'plugin:prettier/recommended',
      ],
      rules: {
        'import/prefer-default-export': 'off',
        'import/no-extraneous-dependencies': 'off',
        'class-methods-use-this': 'off',
        'no-underscore-dangle': 'off',
        'no-console': ['error', { allow: ['warn', 'error'] }],
        '@typescript-eslint/prefer-readonly': ['error'],
        '@typescript-eslint/indent': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: 'memberLike',
            modifiers: ['private'],
            format: ['camelCase'],
            leadingUnderscore: 'require',
          },
        ],
      },
    },
    // NOTE: WE ARE NOT APPLYING PRETTIER IN THIS OVERRIDE, ONLY @ANGULAR-ESLINT/TEMPLATE
    {
      files: ['*.html'],
      extends: ['plugin:@angular-eslint/template/recommended'],
      rules: {},
    },
    // NOTE: WE ARE NOT APPLYING @ANGULAR-ESLINT/TEMPLATE IN THIS OVERRIDE, ONLY PRETTIER
    {
      files: ['*.html'],
      excludedFiles: ['*inline-template-*.component.html'],
      extends: ['plugin:prettier/recommended'],
      rules: {
        // NOTE: WE ARE OVERRIDING THE DEFAULT CONFIG TO ALWAYS SET THE PARSER TO ANGULAR (SEE BELOW)
        'prettier/prettier': ['error', { parser: 'angular' }],
      },
    },
  ],
};
