import { Component, OnInit } from '@angular/core';
import { CharactersService } from 'src/app/providers/characters/characters.service';
import { ActivatedRoute } from '@angular/router';
import { ErrorService } from 'src/app/providers/error-service/error-service.service';
import { ModalDetalleComicComponent } from '../modal-detalle-comic/modal-detalle-comic.component'
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-comics-character',
  templateUrl: './comics-character.component.html',
  styleUrls: ['./comics-character.component.css']
})
export class ComicsCharacterComponent implements OnInit {

  public loading  : boolean = false;
  public idCharacter : any; 
  public comicsAll : any; 
  public character : any;

  constructor(
    private charactersService : CharactersService,
    private _route : ActivatedRoute,
    private errorService: ErrorService,
    private dialog: MatDialog,
  ) {
    if(this._route.snapshot.queryParams['id'] != undefined){
      this.idCharacter = this._route.snapshot.queryParams['id'];
    }
   }

  //Carga los datoa
  ngOnInit() {
    this.getComics();
  }

  //Obtiene todos los comics relacionados a un personaje
  async getComics()  {
    this.loading = true;
    this.comicsAll = []

    //Obtiene los comis
    await this.charactersService.getComicsLimit(100, this.idCharacter).then((data : any = []) => {
      this.comicsAll = data.results;
      
    }).catch(error => {
      this.capturarMessage('Error '+ error.error.code + ': ' + error.error.status, 'error-dialog', 3000);
      this.loading = false;
    })

    //Obtiene la informacion del personaje
    await this.charactersService.getCharacterForId(this.idCharacter).then((data : any = []) => {
      this.character = data.results[0];
      console.log(this.character)
    }).catch(error => {
      this.capturarMessage('Error '+ error.error.code + ': ' + error.error.status, 'error-dialog', 3000);
      this.loading = false;
    })

    this.loading = false;
  }


  //Abre la modal de dellate de comic
  openDetailComic(data: any){
    this.dialog.open(ModalDetalleComicComponent, {
      
      data : data,
      height: 'auto',
      width: 'auto'
    })
  }

  //Envia el error al servicio de errores
  capturarMessage(text: string, clase: string, duration: number){
    this.errorService.capturarMessage(text, clase, duration);
    this.getComics();
  }

}
