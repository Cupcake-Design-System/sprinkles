# Contributing to Sprinkles

The following is a set of guidelines for adding Sprinkles.

#### Table Of Contents

[What should I know before I get started?](#what-should-i-know-before-i-get-started)

- [Components](#components)
- [Directives](#directives)
- [Pipes](#pipes)

[How can I contribute?](#how-can-i-contribute)

- [Git Branching Model](#git-branching-model)
- [Git Commit Messages](#git-commit-messages)
- [Pull requests](#pull-requests)

[Code Rules](#code-rules)

- [Styleguides](#styleguides)
- [Formatting](#formatting)

[Additional Notes](#additional-notes)

## What should I know before I get started

There are three different types of sprinkles: Components, Directives, and Pipes. They will all export out of the same repo, so that a project that utilizes Sprinkles will simply import all the modules they need in their app. The documentation for Sprinkles is provided by (Storybook)[https://storybook.js.org]. As you peruse the project, you will see that components and documentation live in the same directories.

### Components

For example, the card component directory contains the following files:

- card.component.html - the Angular template
- card.component.notes.md - the documentation that Storybook presents under the 'Notes' tab
- card.component.scss - the Angular style file
- card.theme.scss - Any use of scss variables coming from cupcake should be defined here and then added as an import to `theme.scss`
- card.component.spec.ts - Jest test file
- card.component.stories.ts - the Storybook configuration file for the Card Component
- card.module.ts - the module that exports the Card component
- index.ts - provide all available exports in this module to the public api.

So, each new module will likely have each of these files. Additionally, each new module will need to be added to `public_api.ts` in order to expose it publically. There may be cases where components have children components, all of which are defined in the module.

### Directives

tbd

### Pipes

Pipes are all contained as subdirectories in `/src/lib/pipes/`. Each Pipe is defined in its own section in `pipes.component.stories.ts` and exported in `pipes.module.ts`.

For example, the contains pipe directory contains the following files:

- contains.notes.md - the documentation that Storybook presents under the 'Notes' tab
- contains.pipe.spec.ts - Jest test file
- contains.pipe.ts - the Angular pipe file

## How can I contribute?

### Git Branching Model

This repository follows [GitHub flow](https://guides.github.com/introduction/flow/). Use develop as the root branch, and use `feature/name-of-sprinkle` or `bug/fix-this-sprinkle` as the name.

### Git Commit Messages

Please be painfully accurate with your commit messages. Err on the side of too much information. Those that follow thank you!

### Pull requests

Please follow these steps working with PR:

1. Open early
2. Use "work in progress" `[WIP]` | "ready for review" `[RFR]` marks to show the state of PR
3. Address comments
4. Check that CI steps are successful
5. Merge using `Squash and merge` option

## Code Rules

### Styleguides

Contributing to the project adhere to:

- [Angular Style Guide](https://angular.io/guide/styleguide)

### Formatting

Sprinkles code should be formatted with [Prettier](https://prettier.io/docs/en/index.html).
