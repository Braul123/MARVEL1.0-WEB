import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetalleComicComponent } from './modal-detalle-comic.component';

describe('ModalDetalleComicComponent', () => {
  let component: ModalDetalleComicComponent;
  let fixture: ComponentFixture<ModalDetalleComicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDetalleComicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDetalleComicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
