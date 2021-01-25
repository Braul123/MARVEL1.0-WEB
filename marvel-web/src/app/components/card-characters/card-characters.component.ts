import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-characters',
  templateUrl: './card-characters.component.html',
  styleUrls: ['./card-characters.component.css']
})
export class CardCharactersComponent implements OnInit {

  @Input() charactersAll: any;

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }


  goComics(id: any) : void{
    console.log('Hola a');
    
    this.router.navigate(['/characters/comics'],);
  }

}
