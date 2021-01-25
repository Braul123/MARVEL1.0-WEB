import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-detalle-comic',
  templateUrl: './modal-detalle-comic.component.html',
  styleUrls: ['./modal-detalle-comic.component.css']
})
export class ModalDetalleComicComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

}
