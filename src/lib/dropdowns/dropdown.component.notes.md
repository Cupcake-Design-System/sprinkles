## Switch Element
Based on [Cupcake's dropdown format](https://pages.code.ipreo.com/Ipreo/cupcake-docs/content/elements/dropdown/)

### Module
DropdownModule

### Dropdown Properties
| Name              | Type                      | Description                    | Default value         |
| ----------------- | ------------------------- | ------------------------------ | --------------------- |
| color             | CupcakeFlavors            | color of the switch            | none                  |
| size              | CupcakeSizes              | size excluding ng-content      | none (md)             |
| outline           | boolean                   | outline style                  | false         |
| disabled          | boolean                   | disables the switch            | false                 |
| direction         | CupcakeDirections         | direction relative to button the list will display | cover |
| items             | GroupedOptions            | list of items within there respective groups | empty   |
| defaultOptionId   | string                    | PanelOption.Id value to initialize dropdown with | undefined      |
| selected          | function                  | triggers on option selected    | n/a                   |


### Ways to implement
#### Input
```html
<spr-dropdown-sectioned
  outline
  [buttonColor]="color"
  [buttonSize]="size"
  [disabled]="disabled"
  [panelDirection]="direction"
  [items]="items"     
  [defaultOptionId]="defaultOptionId"
  (selected)="selected($event)">
</spr-dropdown-sectioned>
```

#### Interfaces
```js
interface GroupedOptions {
  groupName: string;
  options: Array<PanelOption>;
}
```

```js
interface PanelOption {
  text: string;
  id: string;
}
```