import { Component, OnInit } from '@angular/core';
import { CharactersService }  from 'src/app/providers/characters/characters.service'
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorServiceService } from 'src/app/providers/error-service/error-service.service'
@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {
  
  seleccioneCantidad = [10, 20, 50, 80, 100];
  public charactersAll : any ;
  public limit : number = 10;
  public progress: boolean = true
  public messages : string = 'Hola Prueba'

  constructor(
    private characterService : CharactersService,
    private messaje : MatSnackBar,
    private errorService: ErrorServiceService,
    ) {}


  //Inicia la carga de datos
  ngOnInit(): void {
    this.getAllCharacters();
  }

  //Obtiene todas las caracteristicas de los personajes
  async getAllCharacters () {
    this.charactersAll = [];
    await this.characterService.getCharacters(this.limit).then((data: any = []) =>{
      this.charactersAll = data.results;
    
    //En caso de error - Lo muestra en pantalla
    }).catch( error =>{
      this.capturarMessage('Error: '+ error.error.code + error.error.status, 'error-dialog')
    });

    //Detiene la barra progresiva
    setTimeout(() => {
      this.progress = false; 
    }, 500);
  }

  /**
  * Controla la cantidad de registros para ser visualizados
  */
  establecerCantRegistros(cant?): void {
      this.limit = cant;

      // Reinicio de página
      this.getAllCharacters();
  }
    
  capturarMessage(text: string, clase: string){
    this.errorService.capturarMessage(text, clase);
  }

}
