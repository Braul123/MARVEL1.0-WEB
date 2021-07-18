import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ComicsService }  from 'src/app/providers/comics/comics.service';
import { ErrorService } from 'src/app/providers/error-service/error-service.service';
import { ControlFavoritesService } from 'src/app/providers/control-favorites/control-favorites.service';
import { ModalDetalleComicComponent } from '../modal-detalle-comic/modal-detalle-comic.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-all-comics',
  templateUrl: './all-comics.component.html',
  styleUrls: ['./all-comics.component.css']
})
export class AllComicsComponent implements OnInit {
  @Output() process: EventEmitter<any> = new EventEmitter();
  
  //Modificables
  seleccioneCantidad = [10, 20, 50, 80, 100, 'Todos'];
  public comicsAll : any ;
  public limit = 32;
  public notFound : boolean = false;
  public totalRegistros = 0;
  private favorites: any;

  constructor(
    private comicsService : ComicsService,
    private errorService: ErrorService,
    private controlFavoritesService: ControlFavoritesService,
    private dialog: MatDialog,
    ) {}


  //Inicia la carga de datos
  ngOnInit(): void {
    this.getAllComics();
    this.getFavorites();
  }

  //Obtiene todas las caracteristicas de los personajes
  async getAllComics () {
    this.process.emit(true);
    this.comicsAll = [];
    await this.comicsService.getComics(this.limit).then((data: any) =>{
      this.comicsAll = data.results;
      this.totalRegistros = data.total;
      
      console.log(this.comicsAll);
      console.log(this.totalRegistros);

       // Pone todos los comics como 'no favoritos'
       this.comicsAll.forEach((element) => {
        element.isFavorite = false;
      })

      // Si tiene favoritos en la lista los identifica
      if (this.comicsAll.length > 0 && this.favorites) {
        this.comicsAll.forEach((element) => {
          this.favorites.forEach((fav) => {
            if (fav.id && fav.id === element.id) {
              element.isFavorite = true;
            }
          })
        });
      }
      
    //En caso de error - Lo muestra en pantalla
    }).catch( error =>{
      //Si es exceso de peticiones
      if(error.error.status){
        this.capturarMessage('Error '+ error.error.code + ': ' + (error.error.status), 'error-dialog', 3000);
      }
      //Si es error por limite de datos
      else if(error.error.message){
        this.notFound = true;
        this.errorService.capturarMessage(error.error.code + ': ' + (error.error.message), 'error-dialog', 3000)
      }
    });

    //Detiene la barra progresiva
    setTimeout(() => {
      this.process.emit(false); 
    }, 500);
  }

  /**
  * Controla la cantidad de registros para ser visualizados
  */
  async establecerCantRegistros(cant? : any, toFooter? : boolean) {

    // Si es obtener todos hace la petición con la cantidad total
    if (cant === 'Todos') {
      this.limit = this.totalRegistros;
    } else {
      this.limit = cant;
    }

    // Reinicio de página
    await this.getAllComics();
    // Si hay que llevar al footer lo hace
    if (toFooter) {
      setTimeout(() => {
        const actions = document.getElementById('actions');
        actions.scrollIntoView({behavior: 'smooth'});
      }, 100);
    }
  }
  
  //Envia el error al servicio de errores
  capturarMessage(text: string, clase: string, duration: number){
    this.errorService.capturarMessage(text, clase, duration);
    this.limit = 10; 
    this.getAllComics();
  }

    //Envia el comic al servicio para agregarlo a favoritos
    async addFavorites(data: any){
      let action = 'add';
  
      // Vuelve a obtener los favoritos
      await this.getFavorites();
      
      // Si hay favoritos en la lista valida si hay que agregar o eliminar
      if (this.favorites) {
        await this.favorites.forEach((element) => {
          if (element.id === data.id) {
            action = 'delete';
            // Desmarca el comic
            this.comicsAll.forEach(comic => {
              if (comic.id === data.id) {
                comic.isFavorite = false;
              }
            });
            // Lo elimina de favoritos
            this.controlFavoritesService.removeFavorite(data);
          }
        })
        // Agrega el comic a favoritos
        if (action === 'add') {
          this.controlFavoritesService.addToFavorites(data);
        }
      }
      // Si no hay comics agrega el registro directaente
       else {
        this.controlFavoritesService.addToFavorites(data);
      }
  
      // Refleja los cambios en la lista de comisc
      if (action === 'add') {
        this.comicsAll.forEach(comic => {
          if (comic.id === data.id) {
            comic.isFavorite = true;
          }
        });
      }
    }

    getFavorites(): void {
      this.favorites = this.controlFavoritesService.getFavorites();
    }

      //Abre la modal de dellate de comic
    openDetailComic(data: any){
      this.dialog.open(ModalDetalleComicComponent, {
        
        data : {
          data,
          isFav: false,
          type: 'comic'
        },
        height: 'auto',
        width: '80%'
      })
    }
}
