# Contributing

## Raising Issues

Feel free to raise an issue if you have a question, an enhancement, or a bug report.

Use the issue search functionality to search all **_opened and closed_** issues before raising a new issue. If you raise
a duplicate issue, you're just creating noise for everyone watching this repo.

Before raising a bug, ensure you are using the latest version of our packages. We release every week, so there's a good
chance your issue might have already been fixed.

Finally, when raising a new issue, please fill out the issue template - **_please don't skip sections_**.

Please provide **_as much information as possible_**. This project is maintained by volunteers, so the more the more
information you provide, the less likely we will have to waste everyone's time in asking you for more information.

If you have a particularly complex issue - consider creating a small, self-contained reproduction repo. This will help
you in figuring out the exact problem, and will help us in reproducing and diagnosing the bug.

**_Help us to help you_**

## Commenting

Feel free to comment on any open issue if you have more information that you feel like you can provide. If you don't
have more information, instead use the "reaction" feature on the root comment for the issue. We use reactions to help
gauge which issues are important to the community, so these are the best way to show us an issue is important.

Please refrain from leaving useless comments on issues. Comments like "+1", or "when's this getting fixed", or "any
progress on this" just serve as spam, and annoy every single person subscribed to the issue. Generally we will just
delete those comments, so save everyone time and think twice.

Please refrain from commenting on old, closed issues and PRs. Your issue is rarely related enough to a closed issue to
warrant "necroing" a dead thread - raising a new issue means you can fill in the template, and make it easier for us to
help you. Often times if you comment on a closed issue, we will just ask you to open a new issue, so please save
everyone's time, and **_help us to help you_**.

Please refrain from commenting on `master` commits. Commit comments are not searchable, meaning that nobody else can
discover your comments. Raise an issue and reference the commit instead so that everyone can see your comment, and you
can fill out the template.

---

## Commit Message Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

Where `<type>` is one of:

- `feat` - for any new functionality additions
- `fix` - for any bug fixes that don't add new functionality
- `test` - if you only change tests, and not shipped code
- `docs` - if you only change documentation, and not shipped code
- `chore` - anything else

And `<scope>` may be provided to a commit’s type, to provide additional contextual information and is contained within
parenthesis, e.g., feat(parser): add ability to parse arrays.

And `<description>` is a succinct title for the commit.

`BREAKING CHANGE:` a commit that has a footer BREAKING CHANGE:, or appends a ! after the type/scope, introduces a
breaking API change (correlating with MAJOR in Semantic Versioning). A BREAKING CHANGE can be part of commits of any
type.

### Examples

#### Commit message with description and breaking change footer

```
feat: allow provided config object to extend other configs

BREAKING CHANGE: `extends` key in config file is now used for extending other config files
```

#### Commit message with no body

```
docs: correct spelling of CHANGELOG
```

#### Commit message with scope

```
feat(lang): add polish language
```

## Pull Requests

Anyone is free to help us build and maintain this project. If you see an issue that needs working on because it's
important to you, comment on the issue to help make sure that nobody else works on it at the same time, and then start
working.

Developing in this repo is easy:

- First fork the repo, and then clone it locally.
- Create a new branch.
- In the root of the project, run `npm install` or `yarn install`.
- Create `environment.local.ts` in `environments` directory to provide an API key
  - Add `export const environment = { production: false, apikey: UNDEFINED_OR_YOUR_API_KEY }`
- Run `npm run start:lib` to start the library, then run `npm start` to start the app.
- Make the required changes.

### Raising a PR

Once your changes are ready, you can raise a PR. The title of your PR should match the Commit Message format.

Make sure you use the "Fixes #xxx" format to reference issues, so that GitHub automatically closes the issues when we
merge the PR. Also note that if you are fixing multiple issues at once, you can only reference one issue per line, and
must put one "Fixes #xxx" per issue number.
