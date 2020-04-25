import { Component, OnInit, Optional, Inject } from '@angular/core';
import { DeviceService } from 'src/app/services/common/device.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogDataGeneric } from 'src/app/domain/dto/dialog-data-generic';
import { EstadoService } from 'src/app/services/estado.service';
import { Estado } from 'src/app/domain/giflo_db/estado';

@Component({
  selector: 'app-empresa-dialog',
  templateUrl: './empresa-dialog.component.html',
  styles: []
})
export class EmpresaDialogComponent implements OnInit {

  action: string;
  item: any = {};
  formValid: boolean;
  listEstado: Estado[];

  constructor(
    public device: DeviceService,
    public dialogRef: MatDialogRef<EmpresaDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: DialogDataGeneric,
    private estadoService: EstadoService
  ) {
    const dataInput = { ...data };
    this.action = dataInput.action;
    this.item = dataInput.data;
  }

  ngOnInit() {
    this.estadoService.list().subscribe(list => this.listEstado = list);
  }
  doAction(isValid: boolean) {
    if (isValid) {
      this.dialogRef.close({ event: this.action, data: this.item });
    }
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancelar' });
  }

}
