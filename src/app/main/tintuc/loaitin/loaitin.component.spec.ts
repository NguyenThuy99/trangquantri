import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaitinComponent } from './loaitin.component';

describe('LoaitinComponent', () => {
  let component: LoaitinComponent;
  let fixture: ComponentFixture<LoaitinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaitinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaitinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
