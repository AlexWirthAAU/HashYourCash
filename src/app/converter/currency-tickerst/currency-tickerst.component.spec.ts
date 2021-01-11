import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyTickerstComponent } from './currency-tickerst.component';

describe('CurrencyTickerstComponent', () => {
  let component: CurrencyTickerstComponent;
  let fixture: ComponentFixture<CurrencyTickerstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrencyTickerstComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyTickerstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
