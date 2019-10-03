/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderLinkComponent } from './header-link.component';

describe('HeaderLinkComponent', () => {
  let component: HeaderLinkComponent;
  let fixture: ComponentFixture<HeaderLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderLinkComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.params = {
      path: '/home',
      imgPath: '../../assets/ipreo-logo-white.png',
      classes: ['c-header-logo']
    };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
