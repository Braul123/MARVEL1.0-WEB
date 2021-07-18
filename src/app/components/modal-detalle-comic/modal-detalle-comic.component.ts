import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ErrorService } from 'src/app/providers/error-service/error-service.service';
import { SeriesService } from 'src/app/providers/series/series.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-modal-detalle-comic',
  templateUrl: './modal-detalle-comic.component.html',
  styleUrls: ['./modal-detalle-comic.component.css']
})
export class ModalDetalleComicComponent implements OnInit {

  public characters = [];
  public creators = [];
  public stories = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private errorService : ErrorService,
    private seriesService: SeriesService,
    private router: Router,
  ) { }

  public dataRecord = this.data.data;

  ngOnInit(): void {
    console.log(this.data);
    if (this.data.type === 'serie') {
      this.getDataSerie();
    }
  }

  // Obtiene la informacion de la serie
  async getDataSerie() {
    //PERSONAJES
    await this.seriesService.getRelatedCharacters(this.dataRecord.characters.collectionURI).then((data1: any) => {
      this.characters = data1.results;
      console.log(data1);
      
    }).catch(() => {
      this.errorService.capturarMessage('Could not get related characters', 'error-dialog', 2000);
    });

    //CREADORES
    await this.seriesService.getRelatedCreators(this.dataRecord.creators.collectionURI).then((data2: any) => {
      this.creators = data2.results;
      console.log(data2);
    }).catch(() => {
      this.errorService.capturarMessage('Could not get related characters', 'error-dialog', 2000);
    });

    //HISTORIAS
    await this.seriesService.getRelatedCreators(this.dataRecord.stories.collectionURI).then((data3: any) => {
      this.stories = data3.results;
      console.log(data3);
    }).catch(() => {
      this.errorService.capturarMessage('Could not get related characters', 'error-dialog', 2000);
    })
  }

  goDetailCharacter(id: any): void {
    this.router.navigate(['/characters/comics'], {queryParams: {id}})
  }
}
