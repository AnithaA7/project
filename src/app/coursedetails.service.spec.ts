import { TestBed } from '@angular/core/testing';

import { CoursedetailsService } from './coursedetails.service';

describe('CoursedetailsService', () => {
  let service: CoursedetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoursedetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
