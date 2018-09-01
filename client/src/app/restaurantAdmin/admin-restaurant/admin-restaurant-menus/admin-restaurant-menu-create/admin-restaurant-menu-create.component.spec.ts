import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRestaurantMenuCreateComponent } from './admin-restaurant-menu-create.component';

describe('AdminRestaurantMenuCreateComponent', () => {
  let component: AdminRestaurantMenuCreateComponent;
  let fixture: ComponentFixture<AdminRestaurantMenuCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminRestaurantMenuCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRestaurantMenuCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
