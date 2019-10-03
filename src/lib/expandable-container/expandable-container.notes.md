## Expandable Container

### Module

ExpandableContainerModule

BrowserAnimationsModule will need to be imported in app.module for this module to work as it requires BrowserModule which can only be registered once per app instance.

### Properties

| Name           | Type           | Description                                         | Default value |
| -------------- | -------------- | --------------------------------------------------- | ------------- |
| expanded       | Boolean        | Determines if content is expanded                   | false         |

### Output
expandChangeStarted & expandChangeDone can be used to keep track of when the animation starts and stops;

### Example

```html
<spr-expandable-container [expanded]="isExpanded">
  <ng-container title>
    Header goes here
  </ng-container>
  <ng-container expanded>
    content goes here
  </ng-container>
</spr-expandable-container>
```
