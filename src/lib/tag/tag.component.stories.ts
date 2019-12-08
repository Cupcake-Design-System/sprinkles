import { action } from "@storybook/addon-actions";
import {
  boolean,
  select,
  text,
  withKnobs
} from "@storybook/addon-knobs/angular";
import { storiesOf } from "@storybook/angular";
import { pipeCss } from "src/common/canvasDisplay";
import { CupcakeSizes } from "../common";
import { SprTagComponent } from "./spr-tag.component";

const colors = {
  primary: "primary",
  success: "success",
  warning: "warning",
  danger: "danger"
};

const size = {
  default: null,
  xs: CupcakeSizes.xs,
  sm: CupcakeSizes.sm,
  lg: CupcakeSizes.lg
};

storiesOf("Components|Tags", module)
  .addParameters({
    options: {
      panelPosition: "bottom"
    }
  })
  .addDecorator(withKnobs)
  .add("Tag", () => ({
    moduleMetadata: {
      component: [SprTagComponent],
      declarations: [SprTagComponent]
    },
    component: SprTagComponent,
    template: `
      ${pipeCss}
      <div class="c-d-flex c-flex-row c-m-sm">
      <spr-tag>Tag 1</spr-tag>
      <spr-tag>
        <a href="">Link</a>
      </spr-tag>
      <spr-tag mode="closeable" (onClose)="onClose()">Tag 2</spr-tag>
      <spr-tag mode="closeable" [color]="'primary'" (onClose)="preventDefault($event)">Prevent Default</spr-tag>
      <spr-tag [color]="'primary'">magenta</spr-tag>
      <spr-tag [color]="'success'">red</spr-tag>
      <spr-tag [color]="'warning'">volcano</spr-tag>
      <spr-tag [color]="'danger'">orange</spr-tag>
      <spr-tag [color]="'lime'">lime</spr-tag>
      <spr-tag [color]="'secondary'">green</spr-tag>
      <spr-tag [color]="'cyan'">cyan</spr-tag>
      <spr-tag [color]="'blue'">blue</spr-tag>
      <spr-tag square="true" [color]="'grape'">purple</spr-tag>
      <spr-tag mode="checkable" [checked]="true">Tag1</spr-tag>
      <spr-tag mode="checkable" [checked]="true">Tag2</spr-tag>
      <spr-tag mode="checkable" [checked]="true">Tag3</spr-tag>
<br>
<br>
      <spr-tag [color]="'#f50'">#f50</spr-tag>
      <spr-tag [color]="'#2db7f5'">#2db7f5</spr-tag>
      <spr-tag [color]="'#87d068'">#87d068</spr-tag>
      <spr-tag [color]="'#108ee9'">#108ee9</spr-tag>


      </div>
    `,
    props: {
      color: select("color", colors, "primary"),
      size: select("size", size, null),
      on: text("on text", "ON"),
      off: text("off text", "OFF"),
      noText: boolean("no text", false),
      checked: boolean("checked", true),
      disabled: boolean("disabled", false),
      change: action("changed")
    }
  }));
