import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ControlFavoritesService } from '../../providers/control-favorites/control-favorites.service';
import { ErrorService } from 'src/app/providers/error-service/error-service.service'
@Component({
  selector: 'app-modal-detalle-comic',
  templateUrl: './modal-detalle-comic.component.html',
  styleUrls: ['./modal-detalle-comic.component.css']
})
export class ModalDetalleComicComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private controlFavoritesService : ControlFavoritesService,
    private errorService : ErrorService

  ) { }

  public dataComic = this.data.data;

  ngOnInit(): void {
    console.log(this.data);
    
  }

  //Envia el comic al servicio para agregarlo a favoritos
  addFavorites(data: any){
    this.controlFavoritesService.addToFavorites(data);
  }

  buyComic(){
    this.errorService.capturarMessage('Purchased successfully', 'success-dialog', 1000)
  }

  //Elimina el comic selecionado de los favoritos
  async removeFavorite(data : any){
    await this.controlFavoritesService.removeFavorite(data);
  }
}
