import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownSectionedComponent } from './dropdown-sectioned.component';
import { DropdownSectionComponent } from '../dropdown-section/dropdown-section.component';
import { DropdownSectionOptionComponent } from '../dropdown-section-option/dropdown-section-option.component';

import { ClickOutsideModule } from 'ng-click-outside';
import { of } from 'rxjs';
import { ButtonModule } from 'src/lib/button';


describe('DropdownSectionedComponent', () => {
  let component: DropdownSectionedComponent;
  let fixture: ComponentFixture<DropdownSectionedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ButtonModule, ClickOutsideModule],
      declarations: [ DropdownSectionedComponent, DropdownSectionComponent, DropdownSectionOptionComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownSectionedComponent);
    component = fixture.componentInstance;
    component.items$ = of([]);
    component.selectedOptionId$ = of('');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
