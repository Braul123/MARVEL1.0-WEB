import { Component, OnInit } from '@angular/core';
import { VirtualTimeScheduler } from 'rxjs';
import { CharactersService }  from 'src/app/providers/characters/characters.service'

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {
  
  seleccioneCantidad = [10, 20, 50, 100, 200, "Todos"];
  public charactersAll : any ;
  public limit : number = 10;
  public progress: boolean = true
  public totalRegistros = 0;

  constructor(
    private characterService : CharactersService,
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
      this.totalRegistros = data.total
    });

    //Detiene la barra progresiva
    setTimeout(() => {
      this.progress = false; 
    }, 500);
  }

  viewMoreCharacterist(cant){
    this.limit += cant;
    console.log(this.limit);
    
  }

  /**
  * Controla la cantidad de registros para ser visualizados
  */
  establecerCantRegistros(cant?): void {
    // Si son todos obtiene todos los registros
    if (cant == "Todos") {
      this.limit = this.totalRegistros;
    } else {
      this.limit = cant;
    }

    // Reinicio de página
    this.getAllCharacters();
  }

}
