## Footer Element
Based on [Cupcake's footer format](https://pages.code.ipreo.com/Ipreo/cupcake-docs/content/layout/footer/)

### Module
FooterModule

### Properties
| Name              | Type    | Description                    | Default value         |
| ----------------- | ------- | ------------------------------ | --------------------- |
| transparentFooter | Boolean | toggles transparency on footer | false                 |
| companyName       | String  | Text in 'company name' area    | 'Ipreo by IHS Markit' |
| footerLinks       | object  | data object to populate links  | none                  |

### Examples
```html
<spr-footer
  [transparentFooter]="transparentFooter"
  [companyName]="companyName"
  [footerLinks]="footerLinks"
></spr-footer>
```
