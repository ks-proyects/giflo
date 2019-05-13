import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterUserDataComponent } from './register-user-data.component';

describe('RegisterUserDataComponent', () => {
  let component: RegisterUserDataComponent;
  let fixture: ComponentFixture<RegisterUserDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterUserDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterUserDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
