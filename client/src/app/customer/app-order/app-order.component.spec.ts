import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppOrderComponent } from './app-order.component';

describe('AppOrderComponent', () => {
  let component: AppOrderComponent;
  let fixture: ComponentFixture<AppOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
