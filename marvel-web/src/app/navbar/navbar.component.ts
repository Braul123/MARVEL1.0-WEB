import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl } from "@angular/forms";
import { startWith, map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { CharactersService } from 'src/app/providers/characters/characters.service';
import { ErrorService } from 'src/app/providers/error-service/error-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  control = new FormControl();
  characters: any[];
  
  iterable: Observable<string[]>;

  constructor(
    private router : Router,
    private charactersService: CharactersService,
    private errorService : ErrorService
  ) {}

  //Inicia los valores y el motor de búsqueda
  ngOnInit(){
    this.initSearchValues();
  }

  private _filter(value: any): any[] {
    const filterValue = this._normalizeValue(value);
    return this.characters.filter(char => this._normalizeValue(char).includes(filterValue));
  }

  private _normalizeValue(value: any): string {
    if(value) return value.name.toLowerCase().replace(/\s/g, '');
  }

  goFavorites(){
    this.router.navigate(['/characters/favorites']);
  }

  selected(event: any){
    //Si viene un nombre envia al componente de comics
    if(event.name){
      this.router.navigate(['/characters/comics'], {queryParams: {id : event.id}})
    .then(() => {
      //Recarga la pagina para que la reuta sea valida y renueve la informacion del personaje
      window.location.reload();
    });
    }
    
  }


  //Obtiene parsonajes por nombre
  async changeListCharacters(data: any){


    //Variable que almacena el nombre
   let name = data.target.value; 

    if(name == "") this.initSearchValues();

    //Si hay nombre hace la peticion al servicio
    else if(name.length > 0){
      await this.charactersService.getCharacterForName(name).then((data: any = [])=>{
        this.characters = data;
      }).catch(error =>{
        if(error.error.status){
          this.errorService.capturarMessage('Error '+ error.error.code + ': ' + (error.error.status), 'error-dialog', 3000);
        }
        else if(error.error.message){
          this.errorService.capturarMessage(error.error.code + ': ' + (error.error.message), 'error-dialog', 3000)
        }      })
    }
  }

  initSearchValues(){
    this.characters = [
      {
        name: 'Esperando resultados ...',
        id: '',
        disable : true
      }
    ];

    this.iterable = this.control.valueChanges.pipe(
      startWith(''),
      map((value: any) => {
        return this._filter({name: value, id: ''})}
      )
    );
  }


}
