import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccounttransectionComponent } from './accounttransection.component';

describe('AccounttransectionComponent', () => {
  let component: AccounttransectionComponent;
  let fixture: ComponentFixture<AccounttransectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccounttransectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccounttransectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
