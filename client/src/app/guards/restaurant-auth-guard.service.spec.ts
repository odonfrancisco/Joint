import { TestBed, inject } from '@angular/core/testing';

import { RestaurantAuthGuardService } from './restaurant-auth-guard.service';

describe('RestaurantAuthGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RestaurantAuthGuardService]
    });
  });

  it('should be created', inject([RestaurantAuthGuardService], (service: RestaurantAuthGuardService) => {
    expect(service).toBeTruthy();
  }));
});
