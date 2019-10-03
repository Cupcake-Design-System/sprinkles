## Button Elements - ButtonModule

Based on [Cupcake's button format](https://pages.code.ipreo.com/Ipreo/cupcake-docs/content/elements/buttons/)

### Module

ButtonModule

### Button Type Attributes

| Name       | Description                             |
| ---------- | --------------------------------------- |
| spr-button | base attribute required for all buttons |
| outline    | gives the button icon style             |
| icon       | turns button into an icon button        |
| circle     | turns icon button into a circle         |
| link       | turns button into a link button         |
| submit     | turns button into a submit button       |

### Standard Button

| Name     | Type                | Description               | Default value |
| -------- | ------------------- | ------------------------- | ------------- |
| color    | CupcakeFlavors      | color of the button       | none          |
| size     | CupcakeSizes        | size excluding ng-content | none (md)     |
| disabled | boolean             | disables the button       | false         |

```html
<button
  spr-button
  [color]="color"
  [size]="size"
  [disabled]="disabled"
>
  Regular Button
</button>
```

### Outline Button

| Name     | Type                | Description               | Default value |
| -------- | ------------------- | ------------------------- | ------------- |
| color    | CupcakeFlavors      | color of the button       | none          |
| size     | CupcakeSizes        | size excluding ng-content | none (md)     |
| disabled | boolean             | disables the button       | false         |
| outline  | boolean             | outline style             | false         |


```html
<button
  spr-button
  icon
  [color]="color"
  [size]="size"
  [disabled]="disabled"
  [outline]="outline"
  
>
  Outline Button
</button>
```

### Icon Button

| Name     | Type                | Description               | Default value |
| -------- | ------------------- | ------------------------- | ------------- |
| color    | CupcakeFlavors      | color of the button       | none          |
| size     | CupcakeSizes        | size excluding ng-content | none (md)     |
| disabled | boolean             | disables the button       | false         |

```html
<button
  spr-button
  icon
  [color]="color"
  [size]="size"
  [disabled]="disabled"
>
  <i class="fas fa-star"></i>
</button>
```

### Icon Circle Button

| Name     | Type                | Description               | Default value |
| -------- | ------------------- | ------------------------- | ------------- |
| color    | CupcakeFlavors      | color of the button       | none          |
| size     | CupcakeSizes        | size excluding ng-content | none (md)     |
| disabled | boolean             | disables the button       | false         |

```html
<button
  spr-button
  icon
  circle
  [color]="color"
  [size]="size"
  [disabled]="disabled"
>
  <i class="fas fa-star"></i>
</button>
```

### Link Button

| Name     | Type           | Description               | Default value |
| -------- | -------------- | ------------------------- | ------------- |
| color    | CupcakeFlavors | color of the button       | none          |
| size     | CupcakeSizes   | size excluding ng-content | none (md)     |
| disabled | boolean        | disables the button       | false         |

```html
<button spr-button link [color]="color" [size]="size" [disabled]="disabled">
  link Button
</button>
```

### Submit Button

| Name           | Type           | Description                  | Default value |
| -------------- | -------------- | ---------------------------- | ------------- |
| color          | CupcakeFlavors | color of the button          | none          |
| size           | CupcakeSizes   | size excluding ng-content    | none (md)     |
| disabled       | boolean        | disables the button          | false         |
| submittingText | string         | text during submit animation | none          |
| animate        | boolean        | true shows animated state    | false         |

```html
<button
  spr-button
  submit
  [animate]="animate"
  [submittingText]="submittingText"
  [size]="size"
  [color]="color"
  [disabled]="disabled"
>
  Submit Button
</button>
```
