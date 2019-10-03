# Sprinkles

Sprinkles!!! It's a collection of bite-sized, snackable, production-ready components for your Angular 2+ application, based on the [Cupcake Design System](https://code.ipreo.com/ipreo/cupcake) in use at Ipreo by IHS Markit. The idea is to have access to a variety of useful components in one repository, so that you can quickly set up the module import and populate your app.

Use fewer external dependencies, spend less time on boilerplate, make your product owners happy, and spend more quality time with your family, friends, and/or video game console. What's not to like?

Sprinkles uses Storybook, a fantastic live playground that allows you to view components, see and tweak the code that makes it work, and share with others.

#### Quick Links

- **[Sprinkles Playground/Storybook Demo Site](https://pages.code.ipreo.com/ipreo/sprinkles)**
- **[Cupcake Documentation](https://pages.code.ipreo.com/Ipreo/cupcake-docs/)**
- **[What is Storybook?](https://storybook.js.org/)**
- **[Contribute Your Sprinkles](https://code.ipreo.com/Ipreo/sprinkles/blob/develop/CONTRIBUTING.md)**
- **[Sprinkles on Teams](https://teams.microsoft.com/l/channel/19%3a1d5da58b6e334223a83533274c568ae5%40thread.skype/Sprinkles%2520Angular%2520Components?groupId=5d20d953-9e8f-4c39-9a21-610f537ea457&tenantId=c1156c2f-a3bb-4fc4-ac07-3eab96da8d10)**

# Table of contents

<!--ts-->

- [Add Sprinkles to My App](#add_sprinkles_to_my_app)
- [Run Sprinkles Locally](#run_sprinkles_locally)
- [Contribute Sprinkles](#contribute_sprinkles)
- [Upgrade Storybook](#upgrade_storybook)
- [Package Sprinkles To Go](#package_sprinkles_to_go)
- [Roadmap](#roadmap)
- [Todos](#todos)

<!--te-->

## Add Sprinkles to My App

Sprinkles is organized into one main module with individual child modules. This makes it easier to pick and choose each component and integrate it into your project.

Just add the Sprinkles repository to your project:
`npm install --save @ipreo/ngx-sprinkles`

Then add the submodules you'd like to use to your project's app module:

```
import { HeaderModule, CardModule } from '@ipreo/ngx-sprinkles';
```

and

```
@NgModule({
    ...
    imports: [
        ...
        HeaderModule,
        CardModule,
        PipesModule
        ...
    ],
    ...
```

(In these snippets, only three of the available modules are listed - you only need to import the modules you are using in your project.)

You don't need any dependencies apart from `@ipreo/cupcake`.

Once that is complete, you should be ready to utilize the Sprinkle in your individual display components with `spr` as a prefix, like this:

```
<spr-header [headerDataModel]="headerDataModel"></spr-header>
```

You can find more details about using each individual Sprinkle in the docs.

### Themes

If you would like the ability to define a theme or pick from an existing cupcake theme you must add the following to your `vendor.scss` or `styles.scss` imports
`@import "~@ipreo/cupcake/src/flavors/ihs/ihs.scss";`
`@import "~@ipreo/ngx-sprinkles/lib/scss/sprinkles.scss";`

The first file can either be a theme from cupcake or can be an override file defined within your app.

### Run Sprinkles Locally

This repository comprises two parts. First, it compiles to an importable repository hosted in artifactory with a public api. It also contains the [Storybook demo site](https://pages.code.ipreo.com/ipreo/sprinkles). If you would like to run the documentation locally, you can do so by cloning, running `npm install,` and then `npm run storybook`.

You may want to check out the official [Sprinkles Demo](https://code.ipreo.com/ipreo/sprinkles-demo-app) for a live example of an app that uses Sprinkles in the markup.

### Contribute Sprinkles

We'd love for Sprinkles to grow and incorporate a variety of use cases within Ipreo. If you have an exportable, Cupcake-friendly Angular Component, Directive, or Pipe you'd like to add, that's awesome! Check the [Contributing](https://code.ipreo.com/ipreo/sprinkles/CONTRIBUTING.md) document for more details.

### Upgrade Storybook

Storybook, the open-source `npx npm-check-updates '/storybook/' -u && npm install`

### Package Sprinkles To Go

Sprinkles is configured to run our CI/CD pipeline on every commit. The pipeline runs the unit tests and TSLint, and will report back to GitHub if there are any problems. So your component has tests, you can feel confident that your code is of passing quality.

The core Sprinkles team will take care of merging pull requests into the `develop` branch, deploying the updated Storybook to gh-pages, and publishing the new package to Artifactory.

### Roadmap

With the basics in place, we hope to add additional components in relatively short order. Some priority components would be modals, tooltips, popovers and typeaheads. Another important next step will be to make sure different folks across the organization are aware of the project and feel empowered to contribute.

### AOT build errors
If you see a build erro during AOT similar to the follow:
"Unexpected value 'undefined' imported by the module 'SelectorsModule in C:/projects/bb-sales-portal/src/node_modules/@ipreo/ngx-sprinkles/ipreo-ngx-sprinkles.d.ts'" make sure all of your imports are direct references to the component and modules you are importing. for example:
import { CommonModule } from '../common' vs import { CommonModule } from '../common/common.module.ts'

### Todos

A great place to get involved if you don't have a new component to add, or if you're

- [ ] add observables to header inputs
- [ ] add support for routerLink for header
- [ ] remove Canvas tab under Welcome > Start Here
- [ ] add knobs to pipes
- [ ] add knobs complex objects (e.g. under header and footer)
- [ ] fix live Storybook editing of footer object
- [ ] update clarity and formatting of header notes (specificially references to the header typescript)
- [ ] add code quality/test coverage/other reports to main readme page
- [ ] create/improve changelog for reporting on new versions
- [ ] add automatic update to Teams group on PR, version release
