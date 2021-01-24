import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  //Key para acceder a marvel
  PUBLIC_KEY = '0cfe4d22a69532706e0e75c48a27ec1f';
  HASH = 'a3578f6656d351fa2116d522c7f2d242';
  URL_API = `https:gateway.marvel.com/v1/public/characters?ts=1&apikey=${this.PUBLIC_KEY}&hash=${this.HASH}`;

  constructor(private http: HttpClient) { }

  // Obtiene todos los personajes
  getAllCharacters(limit? : number): Observable<any> {

    let limite = 0;

    //Si hay limite de respuesta la agrega
    if(limit){
      limite = limit; 
      this.URL_API += `&limit=${limite}`;
    } 
    return this.http.get<any>(this.URL_API)
      .pipe(map((data: any) => data.data.results))
  }

  getCharacters(limit? : number | 10){
    return new Promise((resolve, reject)=>{

      let apiUrl = this.URL_API;
    
      //Si hay limite de respuesta la agrega
      if(limit) apiUrl += `&limit=${limit}`;
      
      this.http.get(apiUrl).subscribe((data: any = [])=>{
        resolve(data.data)
      }, err => {
        reject(err);
      })
    })
  }



}