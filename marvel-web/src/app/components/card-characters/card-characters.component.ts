import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-characters',
  templateUrl: './card-characters.component.html',
  styleUrls: ['./card-characters.component.css']
})
export class CardCharactersComponent implements OnInit {

  @Input() charactersAll: any;

  constructor() { }

  ngOnInit(): void {
  }

}
