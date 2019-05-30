import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule, MatSortModule, MatTableModule } from '@angular/material';

import { CompanyList2Component } from './company-list2.component';

describe('CompanyList2Component', () => {
  let component: CompanyList2Component;
  let fixture: ComponentFixture<CompanyList2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyList2Component ],
      imports: [
        NoopAnimationsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyList2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
