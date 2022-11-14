import { TestBed } from '@angular/core/testing';

import { SecurityHttpInterceptor } from './security-http.interceptor';

describe('SecurityHttpInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      SecurityHttpInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: SecurityHttpInterceptor = TestBed.inject(SecurityHttpInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
