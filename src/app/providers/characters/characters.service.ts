import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  private CREDENTIALS = environment.CREDENTIALS;
  private URL_API = environment.URL_API;

  constructor(private http: HttpClient) { }

  // PARA CHARACTERS

  /**
   * @description Obtiene los personajes limitandolo al numero que desee el ususario
   */
  getCharactersLimit(limit: number) {

    return new Promise((resolve, reject) => {

      try {
        let query = `${this.CREDENTIALS}&limit=${limit}`;

        this.http.get(this.URL_API + 'characters' + query).subscribe((data: any = []) => {
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
   * @description Obtiene los comics que coinciden con un nombre
   */
  getCharacterForName(name: string) {

    return new Promise((resolve, reject) => {

      try {
        let query = `${this.CREDENTIALS}&titleStartsWith=${name}&limit=15`;

        this.http.get(this.URL_API + 'comics' + query).subscribe((data: any = []) => {

          //Crea un arreglo y lo inicializa para agregar la data modificada (name and id)
          let resultsSelected : any[] = [{name: '', id: ''}]; 
  
          //Se obtiene solo el nombre y el id del personaje
          data.data.results.forEach(comic => {
            resultsSelected.push({name: comic.title, id: comic.id, data: comic, disable : false})
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

      this.http.get(this.URL_API + 'characters' + query).subscribe((data: any = []) => {
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

      this.http.get(this.URL_API + 'characters' + query).subscribe((data: any = []) => {
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