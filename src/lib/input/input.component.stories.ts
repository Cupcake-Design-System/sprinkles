import { withKnobs } from "@storybook/addon-knobs/angular";
import { storiesOf } from "@storybook/angular";
import { pipeCss } from "src/common/canvasDisplay";
import { addOnModule } from "../utilities/addon/index";
import { sprInputGroupComponent } from "./spr-input-group.component";
import { SprInputDirective } from "./spr-input.directive";
import { sprInputModule } from "./spr-input.module";

storiesOf("Components|Input", module)
  .addDecorator(withKnobs)
  .add("Input", () => ({
    moduleMetadata: {
      declarations: [SprInputDirective],
      exports: [SprInputDirective],
      imports: [addOnModule]
    },
    component: sprInputModule,
    template: `
      ${pipeCss}
      <div class="spr-demo-container">
      <input spr-input placeholder="Basic usage" [(ngModel)]="value" />
      <br />
      <br />
      <input spr-input placeholder="Basic usage" [(ngModel)]="value" [disabled]="true" />
      <br />
      <br />
      <input spr-input placeholder="large size" size="large" />
      <br />
      <br />
      <input spr-input placeholder="default size" size="default" />
      <br />
      <br />
      <input spr-input placeholder="small size" size="small" />
      </div>
    `,
    props: {}
  }));

storiesOf("Components|Input", module)
  .addDecorator(withKnobs)
  .add("Input Group", () => ({
    moduleMetadata: {
      declarations: [SprInputDirective, sprInputGroupComponent],
      exports: [SprInputDirective, sprInputGroupComponent],
      imports: [addOnModule]
    },
    component: sprInputModule,
    template: `
      <div class="c-p-lg">

      <spr-input-group addOnBefore="@">
        <input type="text" spr-input [(ngModel)]="inputValue" />
      </spr-input-group>
      <br />
      <br />

      <spr-input-group addOnAfter="$">
        <input type="text" spr-input [(ngModel)]="inputValue" />
      </spr-input-group>
      <br />
      <br />

      <spr-input-group addOnBefore="@" addOnAfter="$">
        <input type="text" spr-input [(ngModel)]="inputValue" />
      </spr-input-group>
      <br />
      <br />

      <spr-input-group [prefixIcon]="'cog'">
        <input type="text" spr-input placeholder="Enter your username" />
      </spr-input-group>

      <br />
      <br />
      <spr-input-group [prefixIcon]="'cog'" [size]="'large'">
        <input type="text" spr-input placeholder="Enter your username" />
      </spr-input-group>

      <br />
      <br />
      <spr-input-group [prefixIcon]="'cog'" [size]="'small'">
        <input type="text" spr-input placeholder="Enter your username" />
      </spr-input-group>

      <br />
      <br />
      <spr-input-group [suffix]="suffixTemplateInfo" [prefix]="prefixTemplateUser">
        <input type="text" spr-input placeholder="Enter your username" />
      </spr-input-group>
      <ng-template #prefixTemplateUser><button class="c-btn c-btn-primary">Action</button></ng-template>
      <ng-template #suffixTemplateInfo><i class="fas fa-info-circle"></i></ng-template>

      <br />
      <br />
      <spr-input-group suffix="RMB" prefix="￥">
        <input type="text" spr-input />
      </spr-input-group>

      <br />
      <br />
      <spr-input-group>
        <input type="text" spr-input [ngModel]="'0571'" style="width: 20%;" />
        <input type="text" spr-input [ngModel]="'26888888'" style="width:30%;" />
      </spr-input-group>

      <br />
      <br />

      <spr-input-group [afterIcon]="'cog'">
        <input type="text" spr-input [(ngModel)]="inputValue" />
      </spr-input-group>

      <br />
      <br />

      <spr-input-group [beforeIcon]="'cog'">
        <input type="text" spr-input [(ngModel)]="inputValue" />
      </spr-input-group>


      <br />
      <br />

      <spr-input-group [beforeIcon]="'cog'" [afterIcon]="'star'">
        <input type="text" spr-input [(ngModel)]="inputValue" />
      </spr-input-group>

      <br />
      <br />

      <spr-input-group [beforeIcon]="'cog'" [afterIcon]="'star'" [size]="'large'">
        <input type="text" spr-input [(ngModel)]="inputValue" />
      </spr-input-group>


      <br />
      <br />


      <spr-input-group [addOnBefore]="newTemplate">
      <input type="text" spr-input [(ngModel)]="inputValue" />
      </spr-input-group>
      <ng-template #newTemplate><label class="c-checkbox">
      <input type="checkbox" name="radio" checked="">
      <label></label>
      </label></ng-template>
      <br />
      <br />


      </div>
    `,
    props: {}
  }));

storiesOf("Components|Input", module)
  .addDecorator(withKnobs)
  .add("Input Group Addons", () => ({
    moduleMetadata: {
      declarations: [SprInputDirective, sprInputGroupComponent],
      exports: [SprInputDirective, sprInputGroupComponent],
      imports: [addOnModule]
    },
    component: sprInputModule,
    template: `
      <div class="c-p-lg">

      <strong>Addon Before</strong>
      <div class="c-m-bottom-lg c-m-top-md">
        <spr-input-group addOnBefore="USD">
          <input type="text" spr-input [(ngModel)]="inputValue" />
        </spr-input-group>
      </div>


      <strong>Addon After</strong>
      <div class="c-m-bottom-lg c-m-top-md">
        <spr-input-group addOnAfter="$">
          <input type="text" spr-input [(ngModel)]="inputValue" />
        </spr-input-group>
      </div>

      <strong>Addon Before & After</strong>
      <div class="c-m-bottom-lg c-m-top-md">
        <spr-input-group addOnBefore="USD" addOnAfter="$">
          <input type="text" spr-input [(ngModel)]="inputValue" />
        </spr-input-group>
      </div>

      <strong>Addon Icon After</strong>
      <div class="c-m-bottom-lg c-m-top-md">
        <spr-input-group [afterIcon]="'cog'">
          <input type="text" spr-input [(ngModel)]="inputValue" />
        </spr-input-group>
      </div>

      <strong>Addon Icon Before</strong>
      <div class="c-m-bottom-lg c-m-top-md">
        <spr-input-group [beforeIcon]="'cog'">
          <input type="text" spr-input [(ngModel)]="inputValue" />
        </spr-input-group>
      </div>

      <strong>Addon Icon Before & After</strong>
      <div class="c-m-bottom-lg c-m-top-md">
        <spr-input-group [beforeIcon]="'cog'" [afterIcon]="'star'">
          <input type="text" spr-input [(ngModel)]="inputValue" />
        </spr-input-group>
      </div>


      <strong>Addon Icon Before & After Large Size</strong>
      <div class="c-m-bottom-lg c-m-top-md">
        <spr-input-group [beforeIcon]="'cog'" [afterIcon]="'star'" [size]="'large'">
          <input type="text" spr-input [(ngModel)]="inputValue" />
        </spr-input-group>
      </div>


      <spr-input-group [addOnBefore]="newTemplate">
      <input type="text" spr-input [(ngModel)]="inputValue" />
      </spr-input-group>
      <ng-template #newTemplate><label class="c-checkbox">
      <input type="checkbox" name="radio" checked="">
      <label></label>
      </label></ng-template>
      <br />
      <br />


      </div>
    `,
    props: {}
  }));

storiesOf("Components|Input", module)
  .addDecorator(withKnobs)
  .add("Input Affixed", () => ({
    moduleMetadata: {
      declarations: [SprInputDirective, sprInputGroupComponent],
      exports: [SprInputDirective, sprInputGroupComponent],
      imports: [addOnModule]
    },
    component: sprInputModule,
    template: `
      <div class="c-p-lg">

      <strong>Prefix Icon Before Small</strong>
      <div class="c-m-bottom-lg c-m-top-md">
        <spr-input-group [prefixIcon]="'cog'" [size]="'small'">
          <input type="text" spr-input placeholder="Enter your username" />
        </spr-input-group>
      </div>

      <strong>Suffix Icon After Small</strong>
      <div class="c-m-bottom-lg c-m-top-md">
        <spr-input-group [suffixIcon]="'cog'" [size]="'small'">
          <input type="text" spr-input placeholder="Enter your username" />
        </spr-input-group>
      </div>

      <strong>Prefix Icon Before</strong>
      <div class="c-m-bottom-lg c-m-top-md">
        <spr-input-group [prefixIcon]="'cog'">
          <input type="text" spr-input placeholder="Enter your username" />
        </spr-input-group>
      </div>

      <strong>Suffix Icon After</strong>
      <div class="c-m-bottom-lg c-m-top-md">
        <spr-input-group [suffixIcon]="'cog'">
          <input type="text" spr-input placeholder="Enter your username" />
        </spr-input-group>
      </div>

      <strong>Prefix Icon Before Large</strong>
      <div class="c-m-bottom-lg c-m-top-md">
        <spr-input-group [prefixIcon]="'cog'" [size]="'large'">
          <input type="text" spr-input placeholder="Enter your username" />
        </spr-input-group>
      </div>

      <strong>Suffix Icon After Large</strong>
      <div class="c-m-bottom-lg c-m-top-md">
        <spr-input-group [suffixIcon]="'cog'" [size]="'large'">
          <input type="text" spr-input placeholder="Enter your username" />
        </spr-input-group>
      </div>


      <strong>Suffix Icon After Large</strong>
      <div class="c-m-bottom-lg c-m-top-md">
        <spr-input-group [prefixIcon]="'cog'" [suffixIcon]="'cog'" [size]="'large'">
          <input type="text" spr-input placeholder="Enter your username" />
        </spr-input-group>
      </div>


      <spr-input-group [suffix]="suffixTemplateInfo" [prefix]="prefixTemplateUser">
        <input type="text" spr-input placeholder="Enter your username" />
      </spr-input-group>
      <ng-template #prefixTemplateUser><button class="c-btn c-btn-primary">Action</button></ng-template>
      <ng-template #suffixTemplateInfo><i class="fas fa-info-circle"></i></ng-template>

      <br />
      <br />
      <spr-input-group suffix="RMB" prefix="￥">
        <input type="text" spr-input />
      </spr-input-group>

      </div>
    `,
    props: {}
  }));
