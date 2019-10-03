## Radio Button Element
Based on [Cupcake's radio button format](https://pages.code.ipreo.com/Ipreo/cupcake-docs/content/elements/checkboxes-radios/)

### Module
RadioButtonModule

### Checkbox Properties
| Name              | Type                      | Description                    | Default value         |
| ----------------- | ------------------------- | ------------------------------ | --------------------- |
| name              | string                    | radio button group name        | none                  |
| color             | CupcakeFlavors            | color of the radio button      | none                  |
| size              | CupcakeSizes              | size excluding ng-content      | none (md)             |
| disabled          | boolean                   | disables the radio button      | false                 |
| checked           | boolean                   | defines if input is checked    | false                 |
| change            | function                  | onChange function              | none                  |


### Ways to implement
#### Input
```html
<spr-radio-button
  name="group1"
  [checked]="checked">
</spr-radio-button>
```
#### NgModel
```html
<spr-checkbox
  name="group1"
  [(ngModel)]="checked">
</spr-checkbox>
```
#### FormControl
```html
<spr-checkbox
  name="group1"
  [formControl]="control">
</spr-checkbox>
```
