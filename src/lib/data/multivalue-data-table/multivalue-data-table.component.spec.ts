/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MultivalueDataTableComponent } from './multivalue-data-table.component';

describe('MultivalueDataTableComponent', () => {
  let component: MultivalueDataTableComponent;
  let fixture: ComponentFixture<MultivalueDataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultivalueDataTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultivalueDataTableComponent);
    component = fixture.componentInstance;
    component.data = [
      { label: 'Identifiers',
        children: [
          { label: 'Security Type',
            values: [ 'Common Shares', 'ADR' ] }
       ]
      }
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
