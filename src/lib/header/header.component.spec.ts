import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HeaderComponent,
  HeaderItemType,
  HeaderGroup
} from './header.component';
import { HeaderLinkComponent } from './header-link/header-link.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent, HeaderLinkComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.headerItems = [
      {
        type: HeaderItemType.link,
        group: HeaderGroup.right,
        params: { name: 'Right Link', path: '/home' }
      }
    ];
    expect(component).toBeTruthy();
  });
});
