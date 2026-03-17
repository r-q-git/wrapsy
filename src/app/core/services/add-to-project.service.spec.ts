import { TestBed } from '@angular/core/testing';

import { AddToProjectService } from './add-to-project.service';

describe('AddToProjectService', () => {
  let service: AddToProjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddToProjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
