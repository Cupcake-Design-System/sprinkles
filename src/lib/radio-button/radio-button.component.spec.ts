import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RadioButtonComponent } from './radio-button.component';

describe('RadioButtonComponent', () => {
  let component: RadioButtonComponent;
  let fixture: ComponentFixture<RadioButtonComponent>;
  let touched = false;
  let changed = false;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RadioButtonComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioButtonComponent);
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

  test('should check when selcted', () => {
    component.writeValue(true);
    expect(component.checked).toBe(true);
  });

  test('should become touched when selected', async () => {
    component.writeValue(true);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(touched).toBe(true);
  });

  test('should become changed when selcted', async () => {
    component.writeValue(true);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(changed).toBe(true);
  });
});
