import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl } from "@angular/forms";
import { startWith, map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { CharactersService } from 'src/app/providers/characters/characters.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  control = new FormControl();
  streets: any[] = [
    {
      id: 1011334,
      name: "3-D Man"
    },
    {
      id: 1017100,
      name: "A-Bomb (HAS)"
    },
    {
      id: 1009144,
      name: "A.I.M."
    },
    {
      id: 1010699,
      name: "Aaron Stack"
    },
    {
      id: 1009146,
      name: "Abomination (Emil Blonsky)"
    },
    {
      id: 1016823,
      name: "Abomination (Ultimate)"
    },
    {
      id: 1009148,
      name: "Absorbing Man"
    }
  ];
  
  filteredStreets: Observable<string[]>;

  constructor(
    private router : Router,
    private charactersService: CharactersService,
  ) {}

  ngOnInit(){

    this.filteredStreets = this.control.valueChanges.pipe(
      startWith(''),
      map((value: any) => {
        return this._filter({name: value, id: ''})}
      )
    );

  }

  private _filter(value: any): any[] {
    const filterValue = this._normalizeValue(value);
    return this.streets.filter(street => this._normalizeValue(street).includes(filterValue));
  }

  private _normalizeValue(value: any): string {
    if(value) return value.name.toLowerCase().replace(/\s/g, '');
  }

  goFavorites(){
    this.router.navigate(['/characters/favorites']);
  }

  selected(event: any){
    // this.router.navigate([``], {queryParams: {id : event.id}});
    this.router.navigate(['/characters/comics'], {queryParams: {id : event.id}})
    .then(() => {
      window.location.reload();
  });
  }


}
