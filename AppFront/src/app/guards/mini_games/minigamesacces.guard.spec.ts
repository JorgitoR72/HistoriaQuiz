import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { minigamesaccesGuard } from './minigamesacces.guard';

describe('minigamesaccesGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => minigamesaccesGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
