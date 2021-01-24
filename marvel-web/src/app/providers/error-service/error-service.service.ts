import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ErrorServiceService {

  constructor(
    private message : MatSnackBar,
  ) { }

  capturarMessage(messageIn: string, classPanel: string){
    this.message.open(messageIn, '',{
      panelClass: classPanel,
      duration: 3000
    })
  }
}
