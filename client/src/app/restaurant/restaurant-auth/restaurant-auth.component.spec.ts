import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantAuthComponent } from './restaurant-auth.component';

describe('RestaurantAuthComponent', () => {
  let component: RestaurantAuthComponent;
  let fixture: ComponentFixture<RestaurantAuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantAuthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
