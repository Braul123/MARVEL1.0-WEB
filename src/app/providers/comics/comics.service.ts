import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComicsService {

  private CREDENTIALS = environment.CREDENTIALS;
  private URL_API = environment.URL_API;

  constructor(private http: HttpClient) { }

    // PARA COMICS
  /**
   * @description Obtiene todos los comics
   */
   getComics(limit: number) {
    return new Promise((resolve, reject) => {

      try {
        let query = `${this.CREDENTIALS}&limit=${limit}`;  // Agregar el límite si lo requiere .. &limit=${limit}

        this.http.get(this.URL_API + 'comics' + query).subscribe((data: any = []) => {
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
