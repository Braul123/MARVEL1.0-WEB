import { Component, OnInit } from '@angular/core';
import { CharactersService }  from 'src/app/providers/characters/characters.service'
import { ErrorService } from 'src/app/providers/error-service/error-service.service'

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {
  
  seleccioneCantidad = [10, 20, 50, 80, 100];
  public charactersAll : any ;
  public limit : number = 10;
  public loading: boolean = false;
  public notFound : boolean = false;

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
    await this.characterService.getCharactersLimit(this.limit).then((data: any = []) =>{
      this.charactersAll = data.results;
    
    //En caso de error - Lo muestra en pantalla
    }).catch( error =>{
      if(error.error.status){
        this.capturarMessage('Error '+ error.error.code + ': ' + (error.error.status), 'error-dialog', 3000);
      }
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
  establecerCantRegistros(cant?): void {
    this.loading = true
      this.limit = cant;

      // Reinicio de página
      this.getAllCharacters();
  }
  
  //Envia el error al servicio de errores
  capturarMessage(text: string, clase: string, duration: number){
    this.errorService.capturarMessage(text, clase, duration);
    this.limit = 10; 
    this.getAllCharacters();
  }

  

}
