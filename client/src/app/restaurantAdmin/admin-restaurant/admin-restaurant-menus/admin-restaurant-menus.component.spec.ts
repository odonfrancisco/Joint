import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRestaurantMenusComponent } from './admin-restaurant-menus.component';

describe('AdminRestaurantMenusComponent', () => {
  let component: AdminRestaurantMenusComponent;
  let fixture: ComponentFixture<AdminRestaurantMenusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminRestaurantMenusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRestaurantMenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
