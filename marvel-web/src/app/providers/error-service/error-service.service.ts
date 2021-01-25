import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ErrorServiceService {

  constructor(
    private message : MatSnackBar,
  ) { }

  capturarMessage(messageIn: string, classPanel: string, duration? : number | 3000){
    this.message.open(messageIn, '',{
      panelClass: classPanel,
      duration: duration,
    })
  }
}
