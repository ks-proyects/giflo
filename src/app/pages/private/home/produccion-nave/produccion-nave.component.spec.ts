import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduccionNaveComponent } from './produccion-nave.component';

describe('ProduccionNaveComponent', () => {
  let component: ProduccionNaveComponent;
  let fixture: ComponentFixture<ProduccionNaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProduccionNaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProduccionNaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
