import { Component, OnInit, Optional, Inject } from '@angular/core';
import { DeviceService } from 'src/app/shared/device.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddressDialogComponent } from 'src/app/pages/private/home/address-dialog/address-dialog.component';
import { DialogDataGeneric } from 'src/app/domain/dto/dialog-data-generic';
import { Empresa } from 'src/app/domain/giflo_db/empresa';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog-select',
  templateUrl: './dialog-select.component.html',
  styleUrls: ['./dialog-select.component.scss']
})
export class DialogSelectComponent implements OnInit {
  item: any = {};
  formValid: boolean;
  formValid2: boolean;
  listTipo: string[];
  listEmpresa: Empresa[];
  listEmpresaEmpleado: Empresa[];

  constructor(
    private formBuilder: FormBuilder,
    private empresaService: EmpresaService,
    private empleadoService: EmpleadoService,
    public device: DeviceService,
    public dialogRef: MatDialogRef<AddressDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: DialogDataGeneric
  ) {
    const dataInput = { ...data };
    this.item = dataInput.data;
    this.listEmpresa = this.item.empresas;
    this.listEmpresaEmpleado = [];
    this.item.empleados.forEach(element => {
      const id = element.id;
      this.listEmpresaEmpleado.push({ id, ...element.empresa });
    });
    this.listEmpresa = this.listEmpresa.filter(this.onlyUnique);
    this.listEmpresaEmpleado = this.listEmpresaEmpleado.filter(this.onlyUnique);
    if (this.item.hasAllOptions) {
      this.listTipo = ['Empleado', 'Empresario'];
    } else {
      this.item.tipo = this.listEmpresaEmpleado.length > 0 ? 'Empleado' : 'Empresario';
    }
  }

  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  ngOnInit() {
  }
  doAction(isValid: boolean) {
    if (isValid) {
      this.dialogRef.close({ event: 'Guardar', data: this.item });
    }
  }
  closeDialog() {
    this.dialogRef.close({ event: 'Cancelar' });
  }

}
