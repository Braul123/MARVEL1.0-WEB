import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SeriesService }  from 'src/app/providers/series/series.service'
import { ErrorService } from 'src/app/providers/error-service/error-service.service'
import { ModalDetalleComicComponent } from '../modal-detalle-comic/modal-detalle-comic.component'
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent implements OnInit {
  @Output() process: EventEmitter<any> = new EventEmitter();
  
  //Modificables
  seleccioneCantidad = [10, 20, 50, 80, 100, 'Todos'];
  public seriesAll : any ;
  public limit = 32;
  public notFound : boolean = false;
  public totalRegistros = 0;

  constructor(
    private seriesService : SeriesService,
    private errorService: ErrorService,
    private dialog: MatDialog,
    ) {}


  //Inicia la carga de datos
  ngOnInit(): void {
    this.getAllCharacters();
  }

  //Obtiene todas las caracteristicas de los personajes
  async getAllCharacters () {
    this.process.emit(true);
    this.seriesAll = [];
    await this.seriesService.getSeries(this.limit).then((data: any) =>{
      this.seriesAll = data.results;
      this.totalRegistros = data.total;
      
      console.log(this.seriesAll);
      console.log(this.totalRegistros);
      
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
    await this.getAllCharacters();
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
    this.getAllCharacters();
  }

  //Abre la modal de dellate de comic
  openDetailSerie(data: any): void {
    this.dialog.open(ModalDetalleComicComponent, {
      
      data : {
        data,
        isFav: false,
        type: 'serie',
      },
      height: 'auto',
      width: '80%'
    })
  }
}
