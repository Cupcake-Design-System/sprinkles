## Header Element

Based on [Cupcake's header format](https://pages.code.ipreo.com/Ipreo/cupcake-docs/content/layout/header/)

### Module

HeaderModule

### Properties

| Name                | Type                | Description                                                     | Default value |
| ------------------- | ------------------- | --------------------------------------------------------------- | ------------- |
| headerItems         | HeaderItem[]        | Complex array of menu items that populate the array (see below) | []            |
| headerConfiguration | HeaderConfiguration | Object with properties that define style of header (see below)  | {}            |

### Example

```html
<spr-header
  [headerItems]="headerItems"
  [headerConfiguration]="headerConfiguration">
</spr-header>
```

To get started, you can use the below interface for typechecking your headerConfiguration.

```js
interface HeaderConfiguration {
  attachment?: HeaderFixed;
  theme?: HeaderTheme;
  background?: HeaderBackground;
}
```

### Typechecking

There are a variety of types to check your headerItems input.

### Models

```js
enum HeaderGroup { left = 'left', center = 'center', right = 'right' }
```

```js
enum HeaderItemType { link = 'link' // dropdown = 'dropdown' }
```

```js
interface HeaderBaseLinkParams {
  classes?: string[];
}
```

```js
interface HeaderPathLinkParams {
  path: string;
}
```

```js
interface HeaderEventLinkParams {
  event: (event: any) => any;
}
```

```js
interface HeaderNamedLinkParams {
  name: string;
  icon?: string;
}
```

```js
interface HeaderWrapperLinkParams {
  innerHtml: string | SafeHtml;
}
```

```js
interface HeaderLogoLinkParams {
  imgPath: string;
}
```

```js
type HeaderNamedPathLinkParams = HeaderBaseLinkParams &
  HeaderPathLinkParams &
  HeaderNamedLinkParams;
```

```js
type HeaderWrapperPathLinkParams = HeaderBaseLinkParams &
  HeaderPathLinkParams &
  (HeaderWrapperLinkParams | HeaderLogoLinkParams);
```

```js
type HeaderNamedEventLinkParams = HeaderBaseLinkParams &
  HeaderEventLinkParams &
  HeaderNamedLinkParams;
```

```js
type HeaderWrapperEventLinkParams = HeaderBaseLinkParams &
  HeaderEventLinkParams &
  HeaderWrapperLinkParams;
```

```js
export type HeaderLinkParams =
  | HeaderNamedPathLinkParams
  | HeaderWrapperPathLinkParams
  | HeaderNamedEventLinkParams
  | HeaderWrapperEventLinkParams
  | HeaderLogoLinkParams;
```

```js
interface HeaderOptionalPathLinkParams {
  path?: string;
}
interface HeaderOptionalEventLinkParams {
  event?: (event: any) => any;
}
```

```js
// type HeaderItemParams = HeaderLinkParams | HeaderDropdownParams;
```

```js
type HeaderItemParams = HeaderLinkParams;
```

```js
interface HeaderItem {
  type: HeaderItemType;
  group: HeaderGroup;
  params: HeaderItemParams;
}
```

```js
enum HeaderFixed { Fixed = 'fixed', // default Float = 'float' }
```

```js
enum HeaderTheme { Default = 'default', Inverse = 'inverse' }
```

```js
enum HeaderBackground { Default = 'default', Primary = 'primary', Success =
'success', Warning = 'warning', Danger = 'danger' }
```

```js
interface HeaderConfiguration {
  attachment?: HeaderFixed;
  theme?: HeaderTheme;
  background?: HeaderBackground;
}
```
