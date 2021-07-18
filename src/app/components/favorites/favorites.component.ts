import { Component, OnInit } from '@angular/core';
import { ControlFavoritesService } from 'src/app/providers/control-favorites/control-favorites.service';
import { ErrorService } from 'src/app/providers/error-service/error-service.service';
import { ModalDetalleComicComponent } from '../modal-detalle-comic/modal-detalle-comic.component'
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  public loading   : boolean = false;
  public notComics : boolean = false;
  public comicsAll : any;

  constructor(
    private controlFavoritesService : ControlFavoritesService,
    private errorService: ErrorService,
    private dialog : MatDialog
  ) { }

  //Carga los datos
  ngOnInit(): void {
    this.initData();
  }

  //Obtiene los comics favoritos
  async initData(){
    this.loading = true;
    this.comicsAll = await this.controlFavoritesService.getFavorites();

    //Si no hay comics muestra un mensaje
    if(this.comicsAll == null) this.notComics = true;

    this.loading = false;
  }

   //Abre la modal de dellate de comic
    openDetailComic(data: any){
    const dialogRef = this.dialog.open(ModalDetalleComicComponent, {
      data : {
        data,
        isFav : true,
      }, 
      height: 'auto',
      width: '80%'
    })

    dialogRef.afterClosed().subscribe(result =>{
      if(result) this.ngOnInit();
    })

  }

  //Elimina el comic selecionado de los favoritos
  async removeFavorite(data : any){
    this.loading = true
    await this.controlFavoritesService.removeFavorite(data);
    await this.ngOnInit();
    this.loading = false; 
  }

}
