import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckboxComponent } from './checkbox.component';

describe('CheckboxComponent', () => {
  let component: CheckboxComponent;
  let fixture: ComponentFixture<CheckboxComponent>;
  let touched = false;
  let changed = false;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CheckboxComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.registerOnTouched(() => {
      touched = true;
    });

    component.registerOnChange(() => {
      changed = true;
    });
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should check toggle', () => {
    component.toggle();
    expect(component.checked).toBe(true);
  });

  test('should be unchecked after two toggles', () => {
    component.toggle();
    component.toggle();
    expect(component.checked).toBe(false);
  });

  test('should become touched when toggled', async () => {
    component.toggle();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(touched).toBe(true);
  });

  test('should become changed when toggled', async () => {
    component.toggle();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(changed).toBe(true);
  });
});
