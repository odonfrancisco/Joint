import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRestaurantMenuViewComponent } from './admin-restaurant-menu-view.component';

describe('AdminRestaurantMenuViewComponent', () => {
  let component: AdminRestaurantMenuViewComponent;
  let fixture: ComponentFixture<AdminRestaurantMenuViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminRestaurantMenuViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRestaurantMenuViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
