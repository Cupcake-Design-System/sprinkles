import { boolean, select, withKnobs } from "@storybook/addon-knobs/angular";
import { storiesOf } from "@storybook/angular";
import { pipeCss } from "src/common/canvasDisplay";
import { addOnModule } from "../utilities/addon/index";
import { NzSwitchComponent } from "./nz-switch.component";

const colors = {
  primary: "primary",
  success: "success",
  warning: "warning",
  danger: "danger"
};

const size = {
  default: "",
  small: "small"
};

storiesOf("Components|Switched", module)
  .addDecorator(withKnobs)
  .add("Switch", () => ({
    moduleMetadata: {
      component: [NzSwitchComponent],
      declarations: [NzSwitchComponent],
      imports: [addOnModule]
    },
    component: NzSwitchComponent,
    template: `
      ${pipeCss}
      <div class="spr-demo-container">
      <nz-switch size="small" [ngModel]="true"></nz-switch>
      <br>
      <nz-switch
      [nzDisabled]="disabled"
      [ngModel]="checked"
      [size]="size">
      </nz-switch>

      <br>
      <nz-switch [ngModel]="true" checkedChildren="开" nzUnCheckedChildren="关"></nz-switch>
      <br>
      <nz-switch
      [ngModel]="true"
      [checkedChildren]="checkedTemplate"
      [nzUnCheckedChildren]="unCheckedTemplate"
    ></nz-switch>
    <ng-template #checkedTemplate><i class="fas fa-check"></i></ng-template>
    <ng-template #unCheckedTemplate><i class="fas fa-times"></i></ng-template>
    <br>
    <nz-switch [ngModel]="true" [nzDisabled]="isDisabled"></nz-switch>
    <br />
    <button (click)="isDisabled = !isDisabled">Toggle disabled</button>
    <br>
    <nz-switch [ngModel]="true" [nzLoading]="true"></nz-switch>
      </div>
    `,
    props: {
      size: select("size", size, "small"),
      checked: boolean("checked", true),
      disabled: boolean("disabled", false)
    }
  }));
