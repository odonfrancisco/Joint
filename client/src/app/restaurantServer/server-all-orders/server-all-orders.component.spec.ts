import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerAllOrdersComponent } from './server-all-orders.component';

describe('ServerAllOrdersComponent', () => {
  let component: ServerAllOrdersComponent;
  let fixture: ComponentFixture<ServerAllOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServerAllOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerAllOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
