import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { Empresa } from 'src/app/domain/giflo_db/empresa';
import { DeviceService } from 'src/app/shared/device.service';
import { AddressDialogComponent } from '../address-dialog/address-dialog.component';
import { DialogDataGeneric } from 'src/app/domain/dto/dialog-data-generic';
import { DireccionService } from 'src/app/services/direccion.service';
import { Direccion } from 'src/app/domain/giflo_db/direccion';
import { MatDialog } from '@angular/material';
import { EmpresaDialogComponent } from '../empresa-dialog/empresa-dialog.component';
import { UserService } from 'src/app/services/user.service';
import { docJoin } from 'src/app/services/generic/docJoin.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any = {};
  listEmpresa: Empresa[] = [];
  listDirecciones: Direccion[] = [];
  constructor(
    private session: SessionService,
    private empresaService: EmpresaService,
    private userService: UserService,
    private direccionService: DireccionService,
    private empleadoService: EmpleadoService,
    public device: DeviceService,
    public dialog: MatDialog,
    private afs: AngularFirestore
  ) {
    session.getDataUser().subscribe(obj => {
      if (obj.user) {
        userService.get(obj.user.id).valueChanges().pipe(docJoin(this.afs, { estadoCivil: 'estadocivil' })).subscribe(use => {
          this.user = use;
          this.user.rolesStr = obj.user.rolesStr;
          this.user.fechaNacimiento = this.user.fechaNacimiento ? this.user.fechaNacimiento.toDate() : null;
          direccionService.listByPerson(this.user.id).subscribe(result => { this.listDirecciones = result; });
          empresaService.listByUser(this.user.id).subscribe(list => {
            this.listEmpresa = list;
          });
        });

      }
    });
  }
  ngOnInit() {
  }
  openAddres(actionInput, dataInput) {
    const dialogData: DialogDataGeneric = { action: actionInput, data: dataInput };
    const dialogRef = this.dialog.open(AddressDialogComponent, {
      width: 'auto',
      disableClose: true,
      data: dialogData,
      maxHeight: '90vh'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'Crear') {
        result.data.user = this.user.id;
        this.direccionService.create(result.data);
      } else if (result.event === 'Editar') {
        this.direccionService.update(this.direccionService.get(result.data.id), result.data);
      }
    });
  }
  openEmpresa(actionInput, dataInput) {
    const dialogData: DialogDataGeneric = { action: actionInput, data: dataInput };
    const dialogRef = this.dialog.open(EmpresaDialogComponent, {
      width: 'auto',
      disableClose: true,
      data: dialogData,
      maxHeight: '90vh'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'Crear') {
        result.data.user = this.user.id;
        this.empresaService.create(result.data);
      } else if (result.event === 'Editar') {
        this.empresaService.update(this.empresaService.get(result.data.id), result.data);
      }
    });
  }
  openEmpleado(actionInput, dataInput) {
    const dialogData: DialogDataGeneric = { action: actionInput, data: dataInput };
    const dialogRef = this.dialog.open(EmpresaDialogComponent, {
      width: 'auto',
      disableClose: true,
      data: dialogData,
      maxHeight: '90vh'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'Crear') {
        result.data.user = this.user.id;
        this.empleadoService.create(result.data);
      } else if (result.event === 'Editar') {
        this.empleadoService.update(this.empleadoService.get(result.data.id), result.data);
      }
    });
  }
}
