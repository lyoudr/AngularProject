import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EachrestaurantComponent } from './eachrestaurant.component';

describe('EachrestaurantComponent', () => {
  let component: EachrestaurantComponent;
  let fixture: ComponentFixture<EachrestaurantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EachrestaurantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EachrestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
