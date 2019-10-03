## Switch Element
Based on [Cupcake's switch format](https://pages.code.ipreo.com/Ipreo/cupcake-docs/content/elements/switches/)

### Module
SwitchModule

### Switch Properties
| Name              | Type                      | Description                    | Default value         |
| ----------------- | ------------------------- | ------------------------------ | --------------------- |
| color             | CupcakeFlavors            | color of the switch            | none                  |
| size              | CupcakeSizes              | size excluding ng-content      | none (md)             |
| on                | string                    | on text inside switch          | ON                    |
| off               | string                    | off text inside switch         | OFF                   |
| noText            | boolean                   | hide on / off text             | false                 |
| change            | function                  | onChange function              | none                  |
| disabled          | boolean                   | disables the switch            | false                 |
| checked           | boolean                   | defines if input is checked    | false                 |
| change            | function                  | onChange function              | none                  |


### Ways to implement
#### Input
```html
<spr-switch [checked]="checked">
</spr-switch>
```
#### NgModel
```html
<spr-switch [(ngModel)]="checked">
</spr-switch>
```
#### FormControl
```html
<spr-switch [formControl]="control">
</spr-switch>
```
