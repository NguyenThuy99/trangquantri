import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaichudeComponent } from './loaichude.component';

describe('LoaichudeComponent', () => {
  let component: LoaichudeComponent;
  let fixture: ComponentFixture<LoaichudeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaichudeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaichudeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
