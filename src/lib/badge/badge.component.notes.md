## Badge Element

### Module

BadgeModule

Based on [Cupcake's Badge format](https://pages.code.ipreo.com/Ipreo/cupcake-docs/content/elements/badge/)

### Default Properties

| Name           | Type           | Description                                                   | Default value |
| -------------- | -------------- | ------------------------------------------------------------- | ------------- |
| size           | Sizes          | Size options for badge                                        | default       |
| color          | Boolean        | background color                                              | primary       |
| icon           | String         | [Font Awesome Icons](https://fontawesome.com/icons?d=gallery) | empty         |


### Example

```html
<spr-badge
  [color]="success"
  [size]="lg"
  [icon]="fas fa-star">
  Badge
</spr-badge>
```