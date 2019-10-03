import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'spr-expandable-container',
  templateUrl: './expandable-container.component.html',
  styleUrls: ['./expandable-container.component.scss'],
  animations: [
    trigger('shrinkOut', [
      state('in', style({})),
      transition('* => void', [style({ height: '*', opacity: 1 }), animate(255, style({ height: 0, opacity: 0 }))]),
      transition('void => *', [style({ height: 0, opacity: 0 }), animate(255, style({ height: '*', opacity: 1 }))])
    ])
  ]
})
export class ExpandableContainerComponent {
  @Input() public expanded: boolean;
  @Output() public expandChangeStarted = new EventEmitter();
  @Output() public expandChangeDone = new EventEmitter();

  public onAnimationStart() {
    this.expandChangeStarted.emit();
  }

  public onAnimationDone() {
    this.expandChangeDone.emit();
  }
}
