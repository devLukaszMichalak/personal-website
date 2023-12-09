import { TestBed } from '@angular/core/testing';

import { MyGitService } from './my-git.service';

describe('MyGitServiceService', () => {
  let service: MyGitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyGitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
