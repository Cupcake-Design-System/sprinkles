## Cards Element

### Module

CardsModule

Based on [Cupcake's card format](https://pages.code.ipreo.com/Ipreo/cupcake-docs/content/elements/card/)

### Properties

| Name           | Type           | Description                                         | Default value |
| -------------- | -------------- | --------------------------------------------------- | ------------- |
| draggable      | Boolean        | toggles draggable status for card                   | false         |
| headerText     | String         | Text in header of card                              | empty         |
| headerLinkHref | AvatarStatus   | enum for setting the avatar status(color)           | (optional)    |
| loading        | Boolean        | Show loading graphic while waiting for data to load | false         |
| height         | String         | Default min-height of the card                      | empty         |
| flavor         | CupcakeFlavors | Display variant of card                             | empty         |

### Example

```html
<spr-cards
  [draggable]="draggable"
  [headerText]="headerText"
  [headerLinkHref]="headerLinkHref"
  [loading]="loading"
  [height]="height"
  [flavor]="flavor"
>
  This is sample content for the card. Your implementation will show different
  content.
</spr-cards>
```
