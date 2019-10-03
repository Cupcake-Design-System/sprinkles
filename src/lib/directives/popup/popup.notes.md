##  Popup Directive

### Module

DirectivesModule

### Input
| Name              | Type                      | Description                    | Default value         |
| ----------------- | ------------------------- | ------------------------------ | --------------------- |
| sprPopup          | IPopup                    | config for popup               | none                  |

#### Example

```html
<button spr-button [sprPopup]="popupConfig">Click Me</button>
```

#### Models
```js
interface IPopup {
  name: string;
  url: string;
  settings: PopupSettings;
}

class PopupSettings {
  public static defaultSettings = {
    resizable: true,
    height: 600,
    width: 800,
  };
  public resizable: boolean;
  public height: number;
  public width: number;
}
```