import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostcosechaComponent } from './postcosecha.component';

describe('PostcosechaComponent', () => {
  let component: PostcosechaComponent;
  let fixture: ComponentFixture<PostcosechaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostcosechaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostcosechaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
