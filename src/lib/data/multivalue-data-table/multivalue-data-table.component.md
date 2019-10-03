## Multivalue Data Table Element
Based on [Cupcake's Table format](https://pages.code.ipreo.com/Ipreo/cupcake-docs/content/elements/table/)

### Module
DataModule

### Multivalue Data Table Properties
| Name              | Type                      | Description                    | Default value         |
| ----------------- | ------------------------- | ------------------------------ | --------------------- |
| data              | IMultivalueRowData        | nested array of data row elements | empty              |
| addBorder         | Boolean                   | adds thin gray border around all cells | false         |
| addZebraStriping  | Boolean                   | adds faded gray alternate row shading | false          |
| addColFade        | Boolean                   | adds a slight gray shadow effect to value columns | false |

### Ways to implement
#### Input
```html
<spr-multivalue-data-table
  [data]="rowData"
  [addBorder]=true
  [addZebraStriping]=false
  [addColFade]=true
  >
</spr-dropdown-sectioned>
```

#### Interfaces
```js
interface IMultivalueDataRow {
  label: string;
  values?: string[];
  children?: IMultivalueDataRow[];
  config?: IMultivalueDataRowConfig;
  level?: number; // (currently not implemented. Value assigned automatically.)
}
```

```js
interface IMultivalueDataRowConfig {
  isBold?: boolean;
  isItalic?: boolean;
  customValueClasses?: string[]; // use to provide custom classes to cells used to display values only. Does not affect labels.
}
```
### Customizing Styles
This component exposes the following class names that can be used for themeing:

|Class Name                        | Applied To           |
|----------------------------------|----------------------|
| spr-multivalue-data-table-header | first row th cell  |
| spr-multivalue-data-table-label  | first column cells   |
| spr-multivalue-data-table-value  | second+ column cells |

SCSS code example. Can be placed in the .scss file of the consumming component.

```css
:host ::ng-deep .spr-multivalue-data-table-label {
    color: $color-gray-6;
}

:host ::ng-deep .spr-multivalue-data-table-value {
    color: $color-gray-7;
}

:host ::ng-deep .spr-multivalue-data-table-header {
    background-color: white;
}
```

When providing custom classes via the customValueClasses property of your data. Add your styles to the end of your .scss file.<br>
**Note: if you are having difficulty getting your custom classes to apply, try moving the style definition to the bottom of file.**<br>
Example:

```css
// custom config classes
:host ::ng-deep .my-product-header-theme {
    font-size: 10px;
    font-weight: bold;
}
```