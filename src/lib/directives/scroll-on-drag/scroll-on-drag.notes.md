##  Scroll On Drag Directive

### Module

DirectivesModule

### Description
Registers parent container to scroll up and down when a scrollable child object is registered in the top or bottom quarter of the parent

### Input
| Name              | Type                      | Description                    | Default value         |
| ----------------- | ------------------------- | ------------------------------ | --------------------- |
| sprScrollOnDrag   | void                      | registers parent to scroll     | none                  |

#### Example

```html
<div style="overflow-y: scroll; height: 25rem" id="scroll-parent" sprScrollOnDrag>
  <div class="c-bg-primary-2 c-p-xs c-m-xs"
    id="drag-item"
    draggable="true"
    style="height: 2rem; width: 15rem; border: 1px solid black; cursor: pointer">
    Drag Item
  </div>
  <div id="filler-item-for-scroll-bar" style="height: 40rem"></div>
</div>
```