# Sprinkles

Sprinkles!!! It's a collection of bite-sized, snackable, production-ready components for your Angular 2+ application, based on the [Cupcake Design System](https://code.ipreo.com/ipreo/cupcake) in use at Ipreo by IHS Markit. The idea is to have access to a variety of useful components in one repository, so that you can quickly set up the module import and populate your app.

Use fewer external dependencies, spend less time on boilerplate, make your product owners happy, and spend more quality time with your family, friends, and/or video game console. What's not to like?

# Table of contents

<!--ts-->

- [Add Sprinkles to My App](#add_sprinkles_to_my_app)
- [Run Sprinkles Locally](#run_sprinkles_locally)
- [Contribute Sprinkles](#contribute_sprinkles)
- [Package Sprinkles To Go](#package_sprinkles_to_go)
- [Roadmap](#roadmap)

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

### Run Sprinkles Locally

This repository comprises two parts. First, it compiles to an importable repository hosted in artifactory with a public api. It also contains the Storybook demo site that is found at [Ipreo's GitHub site](https://code.ipreo.com/ipreo/sprinkles). If you would like to run the documentation locally, you can do so by cloning, running `npm install,` and then `npm run storybook`.

You may want to check out the official [Sprinkles Demo](https://code.ipreo.com/ipreo/sprinkles-demo-app) for a live example of an app that uses Sprinkles in the markup.

### Contribute Sprinkles

We'd love for Sprinkles to grow and incorporate a variety of use cases within Ipreo. If you have an exportable, Cupcake-friendly Angular Component, Directive, or Pipe you'd like to add, that's awesome! Check the [Contributing](https://code.ipreo.com/ipreo/sprinkles/CONTRIBUTING.md) document for more details.

### Package Sprinkles To Go

TBD - should talk about the CI pipeline here

### Roadmap

TBD
