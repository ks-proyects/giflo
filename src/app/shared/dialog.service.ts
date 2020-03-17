import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MatDialogComponent, DialogData } from '../pages/common/mat-dialog/mat-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openDialog(data: DialogData){
    return this.dialog.open(MatDialogComponent,{
      width:"390px",
      disableClose: true,
      data: data
    })
  }
}
