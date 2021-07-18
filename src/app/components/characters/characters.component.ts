import { Component, OnInit } from '@angular/core';
import { CharactersService }  from 'src/app/providers/characters/characters.service'
import { ErrorService } from 'src/app/providers/error-service/error-service.service'

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {
  
  //Modificables
  seleccioneCantidad = [10, 20, 50, 80, 100, 'Todos'];
  public charactersAll : any ;
  public limit = 6;
  public loading: boolean = false;
  public notFound : boolean = false;
  public totalRegistros = 0;

  constructor(
    private characterService : CharactersService,
    private errorService: ErrorService,
    ) {}


  //Inicia la carga de datos
  ngOnInit(): void {
    this.getAllCharacters();
  }

  //Obtiene todas las caracteristicas de los personajes
  async getAllCharacters () {
    this.loading = true;
    this.charactersAll = [];
    await this.characterService.getCharactersLimit(this.limit).then((data: any) =>{
      this.charactersAll = data.results;
      this.totalRegistros = data.total;
    
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
      this.loading = false; 
    }, 500);
  }

  /**
  * Controla la cantidad de registros para ser visualizados
  */
  async establecerCantRegistros(cant? : any, toFooter? : boolean) {
    this.loading = true

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

  

}
