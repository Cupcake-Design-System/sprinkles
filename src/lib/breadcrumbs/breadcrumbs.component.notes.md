## Breadcrumbs Element

### Module
BreadcrumbsModule

### Checkbox Properties
| Name              | Type                      | Description                           | Default value         |
| ----------------- | ------------------------- | --------------------------------------| --------------------- |
| prefix            | string                    | optional attribute to define  / route | none                  |

```html
<spr-breadcrumbs [prefix]="prefix">
</spr-breadcrumbs>
```

### Breadcrumb service
In the component (AppComponent for example) inject BreadcrumbsService and define mappings (see example).

```js
constructor(breadcrumbService: BreadcrumbService) {
  breadcrumbService.addFriendlyNameForRouteRegex('^/deals/(eq|fi)/[0-9]+/details$', 'Deal Details');
  breadcrumbService.hideRoute('/deals');
  breadcrumbService.hideRouteRegex('^/deals/(eq|fi)$');
  breadcrumbService.hideRouteRegex('^/deals/(eq|fi)/[0-9]+$');
}
```
