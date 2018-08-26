import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KitchenAllOrdersComponent } from './kitchen-all-orders.component';

describe('KitchenAllOrdersComponent', () => {
  let component: KitchenAllOrdersComponent;
  let fixture: ComponentFixture<KitchenAllOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KitchenAllOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KitchenAllOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
