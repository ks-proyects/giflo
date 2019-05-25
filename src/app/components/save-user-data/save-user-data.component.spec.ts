import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveUserDataComponent } from './save-user-data.component';

describe('SaveUserDataComponent', () => {
  let component: SaveUserDataComponent;
  let fixture: ComponentFixture<SaveUserDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveUserDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveUserDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
