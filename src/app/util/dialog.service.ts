import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MatDialogComponent, DialogData } from '../pages/common/mat-dialog/mat-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openDialog(dataInput: DialogData) {
    return this.dialog.open(MatDialogComponent, {
      width: '390px',
      disableClose: true,
      data: dataInput
    });
  }
  openDialogCustom(dataInput: DialogData, component: any) {
    return this.dialog.open(component, {
      width: 'auto',
      disableClose: true,
      data: dataInput,
      maxHeight: '90vh'
    });
  }
}
