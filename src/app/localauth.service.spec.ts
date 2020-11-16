import { TestBed } from '@angular/core/testing';

import { LocalauthService } from './localauth.service';

describe('LocalauthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocalauthService = TestBed.get(LocalauthService);
    expect(service).toBeTruthy();
  });
});
