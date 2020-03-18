import { TestBed } from '@angular/core/testing';

import { ListComponentService } from './list-component.service';

describe('ListComponentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListComponentService = TestBed.get(ListComponentService);
    expect(service).toBeTruthy();
  });
});
