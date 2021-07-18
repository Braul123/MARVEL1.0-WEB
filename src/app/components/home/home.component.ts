import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  public loading = false;
  constructor() { }

  ngOnInit(): void {
  }

  // Controla el loading
  process(event: any): void {
    setTimeout(() => {
      this.loading = event;
    }, 10);
  }
}
