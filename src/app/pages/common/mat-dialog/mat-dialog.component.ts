import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {
  id?: number;
  msg?: string;
  labelOk?: string;
  labelCancel?: string;
  action?: string;
}

@Component({
  selector: 'app-mat-dialog',
  templateUrl: './mat-dialog.component.html',
  styleUrls: ['./mat-dialog.component.scss']
})
export class MatDialogComponent implements OnInit {

  action: string;
  local_data: any;


  constructor(
    public dialogRef: MatDialogRef<MatDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.local_data = { ...data };
    this.action = this.local_data.action;
  }

  ngOnInit() {
  }
  doAction() {
    this.dialogRef.close({ event: this.action, data: this.local_data });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }

}
