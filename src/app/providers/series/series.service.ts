import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {

  private CREDENTIALS = environment.CREDENTIALS;
  private URL_API = environment.URL_API;

  constructor(private http: HttpClient) { }

  // PARA SERIES
  /**
   * @description Obtiene todas las series
   */
   getSeries(limit: number) {
    return new Promise((resolve, reject) => {

      try {
        let query = `${this.CREDENTIALS}&limit=${limit}`;  // Agregar el límite si lo requiere .. &limit=${limit}

        this.http.get(this.URL_API + 'series' + query).subscribe((data: any = []) => {
          resolve(data.data)
        }, err => {
          reject(err);  
        })
      } catch (error) {
        console.log(error);
      }
    })
  }

  getRelatedCharacters(url: string) {
    return new Promise((resolve, reject) => {

      try {
        let query = `${this.CREDENTIALS}`; 

        this.http.get(url + query).subscribe((data: any = []) => {
          resolve(data.data)
        }, err => {
          reject(err);  
        })
      } catch (error) {
        console.log(error);
      }
    })
  }

  getRelatedCreators(url: string) {
    return new Promise((resolve, reject) => {

      try {
        let query = `${this.CREDENTIALS}`; 

        this.http.get(url + query).subscribe((data: any = []) => {
          resolve(data.data)
        }, err => {
          reject(err);  
        })
      } catch (error) {
        console.log(error);
      }
    })
  }

  getRelatedStories(url: string) {
    return new Promise((resolve, reject) => {

      try {
        let query = `${this.CREDENTIALS}`; 

        this.http.get(url + query).subscribe((data: any = []) => {
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
