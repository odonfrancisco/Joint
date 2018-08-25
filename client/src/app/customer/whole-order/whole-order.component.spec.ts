import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WholeOrderComponent } from './whole-order.component';

describe('WholeOrderComponent', () => {
  let component: WholeOrderComponent;
  let fixture: ComponentFixture<WholeOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WholeOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WholeOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
