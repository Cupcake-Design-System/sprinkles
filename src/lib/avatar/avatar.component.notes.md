## Avatar Element

### Module

AvatarModule

Based on [Cupcake's avatar format](https://pages.code.ipreo.com/Ipreo/cupcake-docs/content/elements/avatar/)

### Properties

| Name           | Type           | Description                                                   | Default value |
| -------------- | -------------- | ------------------------------------------------------------- | ------------- |
| size           | Sizes          | Size options for avatar                                       | (empty)       |
| color          | String         | background class styles sets foreground as well               | primary       |
| img            | String         | url of an image                                               | (empty)       |
| icon           | String         | [Font Awesome Icons](https://fontawesome.com/icons?d=gallery) | (empty)       |
| initals        | String         | text letters                                                  | (empty)       |

### Example

```html
<spr-avatar
  [size]="xl"
  [color]="secondary"
  [icon]="fas fa-star">
</spr-avatar>
```
