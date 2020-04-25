import { Component, OnInit, OnDestroy } from '@angular/core';
import { SessionService } from 'src/app/services/common/session.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { Empresa } from 'src/app/domain/giflo_db/empresa';
import { DeviceService } from 'src/app/services/common/device.service';
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
import { EmpleadoDialogComponent } from '../empleado-dialog/empleado-dialog.component';
import { Empleado } from 'src/app/domain/giflo_db/empleado';
import { leftJoinDocument } from 'src/app/services/generic/leftJoin.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  user: any = {};
  listEmpresa: Empresa[] = [];
  listDirecciones: Direccion[] = [];
  listEmpleados: Empleado[] = [];
  private userSubscription: Subscription;
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
  }
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
  ngOnInit() {
    this.userSubscription = this.session.getUser().subscribe(user => {
      if (user) {
        this.userService.get(user.id).valueChanges().pipe(docJoin(this.afs, { estadoCivil: 'estadocivil' })).subscribe(use => {
          this.user = use;
          this.user.rolesStr = user.rolesStr;
          this.user.fechaNacimiento = this.user.fechaNacimiento ? this.user.fechaNacimiento.toDate() : null;
          this.direccionService.listByPerson(this.user.id).subscribe(result => { this.listDirecciones = result; });
          this.empresaService.listByUser(this.user.id).pipe(leftJoinDocument(this.afs, 'estado', 'estado')).subscribe(list => {
            this.listEmpresa = (list as Empresa[]);
          });
          this.empleadoService.listByUser(this.user.id).pipe(
            leftJoinDocument(this.afs, 'empresa', 'empresa'), leftJoinDocument(this.afs, 'estado', 'estado')).subscribe(list => {
              this.listEmpleados = (list as Empleado[]);
            });
        });
      }
    });
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
    const dialogData: DialogDataGeneric = { action: actionInput, data: dataInput, list: this.listEmpresa };
    const dialogRef = this.dialog.open(EmpleadoDialogComponent, {
      width: 'auto',
      disableClose: true,
      data: dialogData,
      maxHeight: '90vh'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'Crear') {
        result.data.user = this.user.id;
        result.data.estado = 'INAC';
        this.empleadoService.create(result.data);
      } else if (result.event === 'Editar') {
        this.empleadoService.update(this.empleadoService.get(result.data.id), result.data);
      }
    });
  }
}
