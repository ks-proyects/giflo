import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogDataGeneric } from 'src/app/domain/dto/dialog-data-generic';
import { DeviceService } from 'src/app/shared/device.service';

@Component({
  selector: 'app-address-edit',
  templateUrl: './address-edit.component.html',
  styleUrls: ['./address-edit.component.scss']
})
export class AddressEditComponent implements OnInit {
  action: string;
  item: any = {};
  formValid: boolean;
  listTipoDireccion: any[] = [
    { value: '', label: '-- SELECCIONA --' },
    { value: 'Domicilio', label: 'Domicilio' },
    { value: 'Trabajo', label: 'Trabajo' },
    { value: 'Otro', label: 'Otro' }
  ];
  constructor(
    public device: DeviceService,
    public dialogRef: MatDialogRef<AddressEditComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: DialogDataGeneric) {
    const dataInput = { ...data };
    this.action = dataInput.action;
    this.item = dataInput.data;
  }

  ngOnInit() {
  }
  doAction(isValid: boolean) {
    if (isValid) {
      this.dialogRef.close({ event: this.action, data: this.item });
    }
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }

}
