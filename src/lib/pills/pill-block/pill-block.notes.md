## PillBlock Element

PillBlock displays a list of pills and allows to remove them

### Module

PillsModule

### Properties

| Name                | Type                                   | Description                                                                                               | Default value |
| ------------------- | -------------------------------------- | --------------------------------------------------------------------------------------------------------- | ------------- |
| items$              | Observable&lt;IListItem[]>             | The list of items to show in the pill block                                                               |               |
| noItemsMessage      | string                                 | The message to show when no items selected                                                                | No items selected |
| action$             | Observable&lt;IListAction OR null>     | Optional action at the bottom of selector                                                                 | EMPTY         |

### Outputs

| Name                | Type                                   | Description                                                                                               |
| ------------------- | -------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| itemsChanged        | EventEmitter&lt;IListChangedEvent>     | Raised when user removes an item                                                                          |

### Models

```js

interface IListItem<TPayload = any> {
  id: string;
  text: string;
  payload?: TPayload;
}

interface IListChangedEvent<TPayload = any> {
  added: IListItem<TPayload>[];
  removed: IListItem<TPayload>[];
  allSelected: IListItem<TPayload>[];
}

```

### Example

``` html
<spr-pill-block [items$]="items$" [noItemsMessage]="noItemsMessage" (itemsChanged)="itemsChanged.emit($event)"></spr-pill-block>
```
