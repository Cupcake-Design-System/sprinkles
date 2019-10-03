import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  OnDestroy,
  OnInit,
  ChangeDetectorRef,
  ElementRef,
  ViewChild,
  HostListener,
  AfterViewInit,
  HostBinding
} from '@angular/core';
import { IListAction, IFocusParams, IMoveFocusParams, ControlSide } from '../../types';
import { Observable, EMPTY } from 'rxjs';
import { takeUntilDestroy } from '../../../utilities/take-until-destroy';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'spr-rich-multiselect-action',
  templateUrl: './rich-multiselect-action.component.html',
  styleUrls: ['./rich-multiselect-action.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RichMultiselectActionComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input()
  public action$: Observable<IListAction>;
  @Input()
  public focus$: Observable<IFocusParams> = EMPTY;
  @Input()
  @HostBinding('tabindex')
  public tabindex = -1;

  @Output()
  public actionExecuting = new EventEmitter<{ isBusy: boolean }>();
  @Output()
  public moveFocus = new EventEmitter<IMoveFocusParams>();

  @ViewChild('actionButton', { read: ElementRef })
  public actionButton: ElementRef<HTMLElement>;
  @HostBinding('class.spr-focused')
  public isFocused = false;

  public actionText = '';

  private executeAction: () => Observable<void>;
  private isActionExecuting = false;

  @HostListener('keydown', ['$event'])
  public onKeyDown(e: KeyboardEvent) {
    // tslint:disable-next-line:deprecation
    const key = e.which || e.keyCode;

    if (key === 38) {
      this.moveFocus.emit({ from: ControlSide.Top });
    } else if (key === 40) {
      this.moveFocus.emit({ from: ControlSide.Bottom });
    }
  }

  @HostListener('focusin', ['$event'])
  public onFocusIn(e: FocusEvent) {
    this.isFocused = true;

    if (e.target !== this.actionButton.nativeElement) {
      this.actionButton.nativeElement.focus();
    }
  }

  @HostListener('focusout')
  public onFocusOut() {
    this.isFocused = false;
  }

  constructor(private readonly changeDetector: ChangeDetectorRef) { }

  public ngOnInit() {
    this.action$.pipe(
      takeUntilDestroy(this),
      filter((action) => action != null)
    ).subscribe(action => {
      this.actionText = action.text;
      this.executeAction = action.execute;

      this.changeDetector.markForCheck();
    });
  }

  public ngAfterViewInit() {
    this.focus$.pipe(takeUntilDestroy(this)).subscribe(() => {
      this.actionButton.nativeElement.focus();

      this.changeDetector.markForCheck();
    });
  }

  public execute() {
    if (this.isActionExecuting) {
      return;
    }

    this.isActionExecuting = true;
    this.actionExecuting.emit({ isBusy: true });
    this.executeAction().pipe(
      takeUntilDestroy(this)
    ).subscribe(null, null, () => {
      this.isActionExecuting = false;
      this.actionExecuting.next({ isBusy: false });
    });
  }

  public ngOnDestroy() { }
}
