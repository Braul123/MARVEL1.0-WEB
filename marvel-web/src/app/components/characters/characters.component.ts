import { Component, OnInit } from '@angular/core';
import { CharactersService }  from 'src/app/providers/characters/characters.service'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {

  
  constructor(
    private characterService : CharactersService
    ) {}

  public charactersAll : any;

  //Inicia 
  ngOnInit(): void {
    this.getAllCharacters();
  }

  //Obtiene todas las caracteristicas de los personajes
  getAllCharacters (){

    this.charactersAll = this.characterService.getAllCharacters();

    // this.charactersAll = this.characterService.getAllCharactersOp().then((data: any) =>{
    //   console.log(data);
    //   this.charactersAll = data;
    // })
  }

}
