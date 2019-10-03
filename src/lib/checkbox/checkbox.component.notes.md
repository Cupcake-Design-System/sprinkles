## Checkbox Element
Based on [Cupcake's checkbox format](https://pages.code.ipreo.com/Ipreo/cupcake-docs/content/elements/checkboxes-radios/)

### Module
CheckboxModule

### Checkbox Properties
| Name              | Type                      | Description                    | Default value         |
| ----------------- | ------------------------- | ------------------------------ | --------------------- |
| color             | CupcakeFlavors            | color of the checkbox          | none                  |
| size              | CupcakeSizes              | size excluding ng-content      | none (md)             |
| disabled          | boolean                   | disables the checkbox          | false                 |
| checked           | boolean                   | defines if input is checked    | false                 |
| change            | function                  | onChange function              | none                  |


### Ways to implement
#### Input
```html
<spr-checkbox [checked]="checked">
</spr-checkbox>
```
#### NgModel
```html
<spr-checkbox [(ngModel)]="checked">
</spr-checkbox>
```
#### FormControl
```html
<spr-checkbox [formControl]="control">
</spr-checkbox>
```
