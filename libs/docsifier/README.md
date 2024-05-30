# docsifier

A bridge between Compodoc and docsify. It takes the output from Compodoc and creates markdown files for docsify.

# How does it work?

It reads `dist/compodoc/documentation.json` and creates the files required by docsify in `dist/docsify`.

# How to use it?

This project should be used from the root using Nx.

Run the following commands from the root:

- `npm run build:docs` - to create the documentation
- `npm run start:docs` - to start the documentation in watch mode

# Why is the cache disabled?

The cache for `nx build docsify` should be invalidated when there are changes to `angular8-yandex-maps`.
I couldn't configure this using `implicitDependencies` or `dependsOn`, so for now, it's disabled.

# Compodoc version

It's fixed at v1.1.18 because, in all newer versions, examples are broken. See https://github.com/compodoc/compodoc/issues/1403
