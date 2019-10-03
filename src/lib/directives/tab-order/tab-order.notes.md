##  Tab Order Directive

### Module

DirectivesModule

### Input
| Name              | Type                      | Description                    | Default value         |
| ----------------- | ------------------------- | ------------------------------ | --------------------- |
| nextElem          | string                    | next element to tab to         | none                  |
| prevElem          | string                    | prev element to tab to         | none                  |

#### Example

```html
<button spr-button sprTabOrder tab-prev="btn2" tab-next="btn2" id="btn1">button1</button>
<button spr-button>Skip Focus</button>
<button sprTabOrder tab-prev="btn1" tab-next="btn1" id="btn2">button2</button>
```