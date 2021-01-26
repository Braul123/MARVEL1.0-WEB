import { Injectable } from '@angular/core';
import { ErrorService } from '../error-service/error-service.service';

@Injectable({
  providedIn: 'root'
})
export class ControlFavoritesService {

  constructor(
    private viewMessage : ErrorService
  ) {

   }

  //Agrega un comic a favoritos
  addToFavorites(data? : any) : void {

    //Obtiene los datos que hay en el localStorage
    let isLength: any = this.hayFavorites();

    //Inicializa el arreglo para poder agregar datos
    let favorites : any = [{ name: 'initial',value: 'initial'}]

    // Si no hay datos lo agrega directamente
    if(isLength == null) {
      favorites.push(data);
      //Elimina el primer objeto ... está vacío
      favorites.splice(0,1);

      //Guarda los favoritos
      localStorage.setItem('favorites', JSON.stringify(favorites));
      this.viewMessage.capturarMessage('Successfully added', 'success-dialog', 1000)

    }

    // De lo contrario lo busca y si no está lo agrega
    else if (isLength.length > 0){

      favorites = isLength;
      let itsHere : boolean = false
      
      //Itera el arreglo de favoritos para verificar que no esté agregado
      isLength.forEach(comic => {
        if(comic.id == data.id){
          itsHere = true;
        }
      });

      //Si está entonces muestra un mensaje
      if(itsHere){
        this.viewMessage.capturarMessage('This comic is already added', 'info-dialog', 1000)
      }
      else {
        favorites.push(data);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        this.viewMessage.capturarMessage('Successfully added', 'success-dialog', 1000);
      }

    }
  }


  removeFavorite(data : any){ 

    let favorites = this.hayFavorites();
    let position : number; 

    if(favorites.length == 1){
      localStorage.clear();
    }
    else if(favorites.length > 1){
      favorites.forEach((comic, index) => {
        if(comic.id == data.id) position = index;
      });
  
      //Elimina el comic de favoritos
      favorites.splice(position, 1);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      this.viewMessage.capturarMessage('Updated successfully', 'success-dialog', 500);
  
    }
    
  }

  //Devuelve los datos que hat en el localStorage
  hayFavorites() {
    return JSON.parse(localStorage.getItem('favorites'));
  }

}
