import { Component, OnInit, Optional, Inject } from '@angular/core';
import { DeviceService } from 'src/app/services/common/device.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogDataGeneric } from 'src/app/domain/dto/dialog-data-generic';
import { Empresa } from 'src/app/domain/giflo_db/empresa';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
  selector: 'app-empleado-dialog',
  templateUrl: './empleado-dialog.component.html',
  styles: []
})
export class EmpleadoDialogComponent implements OnInit {
  action: string;
  item: any = {};
  formValid: boolean;
  listaEmpresas: Empresa[] = [];
  constructor(
    public device: DeviceService,
    private empresaService: EmpresaService,
    public dialogRef: MatDialogRef<EmpleadoDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: DialogDataGeneric
  ) {
    const dataInput = { ...data };
    this.action = dataInput.action;
    this.item = dataInput.data;
  }

  ngOnInit() {
    this.empresaService.listActive().subscribe(list => { this.listaEmpresas = list; });
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
