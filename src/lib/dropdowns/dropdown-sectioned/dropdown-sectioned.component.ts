import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  Renderer2,
  HostBinding,
  ElementRef,
  ViewChildren,
  QueryList,
  AfterViewInit
} from '@angular/core';
import { OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { scrollToView } from '../../utilities/scroll-to-view';
import { DropdownSectionOptionComponent } from '../dropdown-section-option/dropdown-section-option.component';
import { delay } from 'rxjs/operators';
import { ViewChild } from '@angular/core';
import {
  mixinSize,
  mixinColor,
  CupcakeFlavors,
  CupcakeSizes
} from '../../common';

@Component({
  selector: 'spr-dropdown-sectioned',
  templateUrl: './dropdown-sectioned.component.html',
  styleUrls: ['./dropdown-sectioned.component.scss']
})
export class DropdownSectionedComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() color: CupcakeFlavors = CupcakeFlavors.Primary;
  @Input() size: CupcakeSizes = undefined;
  @Input() outline: boolean;
  @Input()
  @HostBinding('attr.disabled')
  disabled: boolean;
  @Input() panelDirection = 'below';
  @Input() items$: Observable<GroupedOptions[]>;
  @Input() selectedOptionId$: Observable<string>;
  @Input() showIdOnHover = false;
  @Output() selected: EventEmitter<string> = new EventEmitter();

  @Input() items: GroupedOptions[];
  @Input() selectedOptionId = '';
  @Input() config: DropdownSectionedConfiguration = { maxScrollHeightPx: 400 };
  @Input() keyboardHoverFaderOn = false;
  @ViewChildren(DropdownSectionOptionComponent, { read: ElementRef })
  optionElementRefQuery: QueryList<ElementRef>;
  optionElements: ElementRef<any>[];
  @ViewChildren(DropdownSectionOptionComponent)
  optionComponentQuery: QueryList<DropdownSectionOptionComponent>;
  optionComponents: DropdownSectionOptionComponent[] = [];

  isPanelVisible = false;
  selectedText: string;
  keyboardOptionIndex = -1;
  keyPressed = false;
  keylistener: any;
  timer: any;
  selectedOptionIndex: number;

  subscriptions = new Subscription();

  constructor(public renderer: Renderer2) {}

  ngOnInit() {
    if (!this.items) {
      this.subscriptions.add(
        this.items$.subscribe(v => {
          this.items = v;
        })
      );

      this.subscriptions.add(
        this.selectedOptionId$.subscribe(v => {
          this.selectedOptionId = v;
          this.selectedOptionIndex = this.optionComponents.findIndex(
            o => o.id === v
          );
          if (this.selectedOptionIndex >= 0) {
            this.setSelectedText();
          }
        })
      );
    }
  }

  ngAfterViewInit() {
    this.subscriptions.add(
      this.optionElementRefQuery.changes.subscribe(c => {
        this.optionElements = c._results;
      })
    );
    this.subscriptions.add(
      this.optionComponentQuery.changes.pipe(delay(0)).subscribe(c => {
        this.optionComponents = c._results;
        this.selectedOptionIndex = this.optionComponents.findIndex(
          o => o.id === this.selectedOptionId
        );
        this.setSelectedText();
      })
    );

    this.optionElements = this.optionElementRefQuery.toArray();
    this.optionComponents = this.optionComponentQuery.toArray();

    this.selectedOptionIndex = this.optionComponents.findIndex(
      o => o.id === this.selectedOptionId
    );
    if (!this.color) this.color = CupcakeFlavors.Primary;

    setTimeout(() => {
      this.setSelectedText();
    }, 1);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  public togglePanel() {
    this.isPanelVisible = !this.isPanelVisible;
    this.toggleKeydownListener();
  }

  onOptionClick(e: Event, option: PanelOption) {
    this.handleOptionChange(option);
    this.togglePanel();
  }

  onEnter(e: KeyboardEvent) {
    const o = this.optionComponents[this.keyboardOptionIndex];
    this.handleOptionChange(o);
  }

  handleOptionChange(option: PanelOption) {
    if (option && option.id !== this.selectedOptionId) {
      this.selected.emit(option.id);
      if (!this.items$) {
        this.updateSelectedOption(option);
      }
    }
    this.resetKeyEvents();
  }

  updateSelectedOption(option: PanelOption) {
    this.selectedOptionId = option.id;
    this.selectedText = option.text;
  }

  public onkeydown(e: KeyboardEvent) {
    clearInterval(this.timer);
    if (e.keyCode === 40) {
      this.setKeyboardHoverFader();
      this.onArrowDown(e);
    } else if (e.keyCode === 38) {
      this.setKeyboardHoverFader();
      this.onArrowUp(e);
    } else if (e.keyCode === 13) {
      this.onEnter(e);
    }
  }

  setKeyboardHoverFader() {
    if (this.keyboardHoverFaderOn) {
      this.timer = setInterval(() => (this.keyPressed = false), 3000);
    }

    this.keyPressed = true;
  }

  onArrowDown(e: KeyboardEvent) {
    if (this.keyboardOptionIndex === this.optionElements.length - 1) {
      this.keyboardOptionIndex = 0;
    } else {
      this.keyboardOptionIndex += 1;
    }

    this.scrollCorrect(
      this.optionElements[this.keyboardOptionIndex].nativeElement
    );
  }

  onArrowUp(e: KeyboardEvent) {
    if (this.keyboardOptionIndex <= 0) {
      this.keyboardOptionIndex = this.optionElements.length - 1;
    } else {
      this.keyboardOptionIndex -= 1;
    }

    this.scrollCorrect(
      this.optionElements[this.keyboardOptionIndex].nativeElement
    );
  }

  private scrollCorrect(element: HTMLElement | null) {
    if (element) {
      scrollToView(element);
    }
  }

  private toggleKeydownListener() {
    if (this.isPanelVisible) {
      this.keylistener = this.renderer.listen('window', 'keydown', e =>
        this.onkeydown(e)
      );
    } else {
      this.keylistener();
    }
  }

  private resetKeyEvents() {
    this.keyboardOptionIndex = -1;
    this.keyPressed = false;
    if (this.keyboardHoverFaderOn) {
      clearInterval(this.timer);
    }
  }

  public getSelectedText(): string {
    if (this.selectedOptionIndex >= 0) {
      return this.optionComponents[this.selectedOptionIndex].text;
    } else {
      return 'Select';
    }
  }

  private setSelectedText() {
    if (this.selectedOptionIndex >= 0) {
      this.selectedText = this.optionComponents[this.selectedOptionIndex].text;
    } else {
      this.selectedText = 'Select';
    }
  }
}

export class GroupedOptions {
  groupName: string;
  options: Array<PanelOption>;
}

export class PanelOption {
  text: string;
  id: string;
}

export interface DropdownSectionedConfiguration {
  maxScrollHeightPx?: number;
}
