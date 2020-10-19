import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TinTucComponent } from './tintuc.component';

describe('TinTucComponent', () => {
  let component: TinTucComponent;
  let fixture: ComponentFixture<TinTucComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TinTucComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TinTucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
