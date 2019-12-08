/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  animate,
  AnimationTriggerMetadata,
  style,
  transition,
  trigger
} from "@angular/animations";
export class AnimationDuration {
  static SLOW = "0.3s"; // Modal
  static BASE = "0.2s";
  static FAST = "0.1s"; // Tooltip
}

export const fadeMotion: AnimationTriggerMetadata = trigger("fadeMotion", [
  transition(":enter", [
    style({ opacity: 0 }),
    animate(`${AnimationDuration.BASE}`, style({ opacity: 1 }))
  ]),
  transition(":leave", [
    style({ opacity: 1 }),
    animate(`${AnimationDuration.BASE}`, style({ opacity: 0 }))
  ])
]);
