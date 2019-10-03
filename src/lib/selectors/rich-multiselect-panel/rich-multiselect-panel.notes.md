## RichMultiselectPanel Element

RichMultiselectPanel component initially developed for Sales Portal contacts

### Module

SelectorsModule

### Properties

| Name                | Type                                   | Description                                                                                               | Default value |
| ------------------- | -------------------------------------- | --------------------------------------------------------------------------------------------------------- | ------------- |
| selectedItems$      | Observable&lt;IListItem[]>             | The list of selected items provided initially. Can also provide new values after the component is updated | EMPTY         |
| searchResult$       | Observable&lt;IListSearchResult>       | Parent component must provide the list of search results here                                             |               |
| action$             | Observable&lt;IListAction OR null>     | Optional action at the bottom of selector                                                                 | EMPTY         |
| search$             | Observable&lt;string>                  | Search string if it needs to be updated externally. WILL NOT invoke 'searchChanged'                       | EMPTY         |
| selectorHeight      | string                                 | The height of selector part                                                                               | 150px         |
| noResultMessage     | string                                 | The message that is shown when no results found                                                           | No results found |
| tooManyResultsMessage | string                               | The message that is shown when too many results are found                                                 | Too many results found |
| noItemsSelectedMessage | string                              | The message that is shown instead of pills when there are no items selected                               | No items selected |
| searchPlaceholder   | string                                 | Placeholder for search input                                                                              | Search        |
| highlightSearchFocus | boolean							   | Highlights search input when it is focused                                                                | true          |
| addSelectAll        | boolean                                | Adds select all option to the list of displayed items                                                     | false         |
| localFilter         | 'default' OR ((items: IListItem[], search: string) => IListItem[]) | Local search. If you search only on server side - replace with null           | 'default' - performs case-insensitive search |

### Outputs

| Name                | Type                                   | Description                                                                                               |
| ------------------- | -------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| searchChanged       | EventEmitter&lt;string>                | Raised when search input is changed                                                                       |
| selectionChanged    | EventEmitter&lt;IListChangedEvent>     | Raised when the list of selected items is changed                                                         |

### Models

```js

interface IListItem<TPayload = any> {
  id: string;
  text: string;
  payload?: TPayload;
}

interface IListSearchResult<TPayload = any> {
  items: IListItem<TPayload>[];
  isLoading: boolean;
  isTooManyResults: boolean;
}

interface IListChangedEvent<TPayload = any> {
  added: IListItem<TPayload>[];
  removed: IListItem<TPayload>[];
  allSelected: IListItem<TPayload>[];
}

interface IListAction {
  text: string;
  execute(): Observable<void>;
}

```
# Example

```html
<spr-rich-multiselect-panel
  [selectedItems$]="selectedItems$"
  [searchResult$]="searchResult$"
  [action$]="action$"
  [search$]="search$"
  [selectorHeight]="selectorHeight"
  [noResultsMessage]="noResultsMessage"
  [tooManyResultsMessage]="tooManyResultsMessage"
  [noItemsSelectedMessage]="noItemsSelectedMessage"
  [searchPlaceholder]="searchPlaceholder"
  [size]="size"
  (searchChanged)="onSearchChanged($event)"
  (selectionChanged)="selectionChanged.emit($event)">
</spr-rich-multiselect-panel>`
```
