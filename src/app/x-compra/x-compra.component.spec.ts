import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XCompraComponent } from './x-compra.component';

describe('XCompraComponent', () => {
  let component: XCompraComponent;
  let fixture: ComponentFixture<XCompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ XCompraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(XCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
