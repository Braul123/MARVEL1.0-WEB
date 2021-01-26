import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-card-characters',
  templateUrl: './card-characters.component.html',
  styleUrls: ['./card-characters.component.css']
})
export class CardCharactersComponent implements OnInit {

  @Input() charactersAll: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
  }


  //Dirige a la pagina de comics
  goComics(id: any) : void{
    this.router.navigate(['/characters/comics'], {queryParams : {id: id}});
  }

}
