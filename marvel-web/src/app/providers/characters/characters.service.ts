import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {
  PUBLIC_KEY = '0cfe4d22a69532706e0e75c48a27ec1f';
  HASH = 'a3578f6656d351fa2116d522c7f2d242';
  URL_API = `https:gateway.marvel.com/v1/public/characters?ts=1&apikey=${this.PUBLIC_KEY}&hash=${this.HASH}`;

  constructor(private http: HttpClient) { }

  getAllCharacters(): Observable<any> {
    return this.http.get<any>(this.URL_API)
      .pipe(map((data: any) => data.data.results))
  }


   /**
   * @description Obtiene todas las compañias creadas en el sistema
   */

  public getAllCharactersOp() {

    return new Promise((resolve, reject) => {
      this.http.get(this.URL_API).subscribe((data: any) => {
        resolve(data.data.results);
      }, err => {
        reject(err);
      });
    });
  }
}