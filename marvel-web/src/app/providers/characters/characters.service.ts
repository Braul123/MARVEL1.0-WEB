import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CharactersModule } from 'src/app/components/characters.module';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  //Key para acceder a marvel
  PUBLIC_KEY = '0cfe4d22a69532706e0e75c48a27ec1f';
  HASH = 'a3578f6656d351fa2116d522c7f2d242';
  URL_API = `https:gateway.marvel.com/v1/public/characters?ts=1&apikey=${this.PUBLIC_KEY}&hash=${this.HASH}`;

  constructor(private http: HttpClient) { }


  /**
   * @description Obtiene los personajes limitandolo al numero que desee el ususario
   */
  getCharactersLimit(limit?: number | 10) {

    return new Promise((resolve, reject) => {

      let apiUrl = this.URL_API;

      //Si hay limite de respuesta la agrega
      if (limit) apiUrl += `&limit=${limit}`;

      this.http.get(apiUrl).subscribe((data: any = []) => {
        resolve(data.data)
      }, err => {
        reject(err);
      })
    })

  }


  /**
   *@description Obtiene todos los personajes mediante un for
   * ya que la api solo permite obtener 100 por cada petición
   */

  async getCharactersAll() {

    let offset = 0;
    let results: any = [];
    let charctersAll: any = [];

    //itera la peticion para obtener mas de 100 registros
    for (let i = 0; i <= 1; i++) {
      results = await this.apiCharactersAll(offset);

      //Concatena los arreglos obtenidos
      charctersAll = charctersAll.concat(results);
      offset += 100;
    }

    //Reutilizando variable results para guardar solo el nombre y id del personaje
    results = [];
    charctersAll.forEach(char => {
      results.push({id: char.id, name: char.name})
    });

    //Convierte el arreglo en un JSON y lo guarda en el localStorage 
    results = JSON.stringify(results)
    localStorage.setItem('charactersAll', results);
  }


  /**
   * @description Obtiene el maximo de personajes permitidos y los retorna a getCharactersAll()
   */
  apiCharactersAll(offset: number) {

    return new Promise((resolve, reject) => {

      //modifica la ruta para enviar el limite y el punto de partida para traer los registros
      let apiUrl = this.URL_API + `&limit=100&offset=${offset}`;

      this.http.get(apiUrl).subscribe((data: any = []) => {
        resolve(data.data.results)
      }, err => {
        reject(err);
      })
    })

  }


}