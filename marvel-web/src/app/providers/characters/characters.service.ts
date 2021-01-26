import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  //Key para acceder a marvel api cuenta 1 ... usar segunda cuenta en caso de limite de peticiones
  PUBLIC_KEY = '0cfe4d22a69532706e0e75c48a27ec1f';
  HASH = 'a3578f6656d351fa2116d522c7f2d242';

  //Segunda Cuenta ... Peticione limitadas
  PUBLIC_KEY2 = 'e8bdf9e3c1fbdc0613bcbd15ec9848b6';
  HASH2 = '9233432e3c656aa4469d4ec2b130ebdc';


  CREDENTIALS = `?ts=1&apikey=${this.PUBLIC_KEY}&hash=${this.HASH}`
  URL_API = `https:gateway.marvel.com/v1/public/characters`;

  constructor(private http: HttpClient) { }

  // PARA CHARACTERS

  /**
   * @description Obtiene los personajes limitandolo al numero que desee el ususario
   */
  getCharactersLimit(limit: number) {

    return new Promise((resolve, reject) => {

      try {
        let query = `${this.CREDENTIALS}&limit=${limit}`;

        this.http.get(this.URL_API + query).subscribe((data: any = []) => {
          resolve(data.data)
        }, err => {
          reject(err);  
        })
      } catch (error) {
        console.log(error);
      }
    })

    
  }

    /**
   * @description Obtiene los personajes que coinciden con un nombre
   */
  getCharacterForName(name: string) {

    return new Promise((resolve, reject) => {

      try {
        let query = `${this.CREDENTIALS}&nameStartsWith=${name}&limit=10`;

        this.http.get(this.URL_API + query).subscribe((data: any = []) => {

          //Crea un arreglo y lo inicializa para agregar la data modificada (name and id)
          let resultsSelected : any[] = [{name: '', id: ''}]; 
  
          //Se obtiene solo el nombre y el id del personaje
          data.data.results.forEach(char => {
            resultsSelected.push({name: char.name, id: char.id})
          });
  
          //Se borra la primera posición, está vacía
          resultsSelected.splice(0,1);
          resolve(resultsSelected)
        }, err => {
          reject(err);
        })
      } catch (error) {
        console.log(error)
      }
     
    })
  }


   /**
   * @description Obtiene un personaje por id
   */
  getCharacterForId(id: string) {

    return new Promise((resolve, reject) => {
      try {
        //Genera la query para consumir el endpoint
      let query = `/${id}${this.CREDENTIALS}`;

      this.http.get(this.URL_API + query).subscribe((data: any = []) => {
        resolve(data.data)
      }, err => {
        reject(err);
      })
      } catch (error) {
        console.log(error);
        
      }
      
    })

  }

  //PPARA COMICS * * * * * * * * * * * * * * * * 

  /**
   * @description Obtiene los comics relacionados a un personaje
   */
  getComicsLimit(limit: number | 10, id: string) {

    return new Promise((resolve, reject) => {

      try {
        //Genera la query para consumir el endpoint
      let query = `/${id}/comics${this.CREDENTIALS}&limit=${limit}`;

      this.http.get(this.URL_API + query).subscribe((data: any = []) => {
        resolve(data.data)
      }, err => {
        reject(err);
      })
      } catch (error) {
        console.log(error);
        
      }
      
    })

  }
 

}