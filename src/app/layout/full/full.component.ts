import { Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  AfterViewInit,
  OnInit,
  OnChanges,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewChecked
} from '@angular/core';
import { PerfectScrollbarConfigInterface, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { SessionService } from 'src/app/services/session.service';
import { AuthenticationService } from 'src/app/security/authentication.service';
import { DeviceService } from 'src/app/shared/device.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatDialog } from '@angular/material';
import { DialogDataGeneric } from 'src/app/domain/dto/dialog-data-generic';
import { DialogSelectComponent } from './dialog-select/dialog-select.component';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { leftJoinDocument } from 'src/app/services/generic/leftJoin.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Empleado } from 'src/app/domain/giflo_db/empleado';
@Component({
  selector: 'app-blank',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.less']
})
export class FullComponent implements OnDestroy, OnInit {
  uid: string;
  sidebarOpened;
  status = false;
  config: PerfectScrollbarConfigInterface = {};
  clickEvent() {
    this.status = !this.status;
  }
  constructor(
    private auth: AuthenticationService,
    public device: DeviceService,
    private afAuth: AngularFireAuth,
    private sessionService: SessionService,
    public dialog: MatDialog,
    public empleadoService: EmpleadoService,
    public empresaService: EmpresaService,
    private afs: AngularFirestore
  ) {
  }
  ngOnDestroy(): void {
  }
  ngOnInit() {
    this.afAuth.user.subscribe(userLogin => {
      try {
        if (this.sessionService.userData === undefined ||
          (this.sessionService.userData && this.sessionService.userData.idEmpleado === undefined &&
            this.sessionService.userData.idEmpresa === undefined)) {
          this.empresaService.listByUser(userLogin.uid).subscribe(listEmpresa => {
            this.empleadoService.listByUser(userLogin.uid).
              pipe(leftJoinDocument(this.afs, 'empresa', 'empresa')).subscribe(listEmpleado => {
                const listEmpleados = listEmpleado as Empleado[];
                this.sessionService.userData = this.sessionService.userData ? this.sessionService.userData : {};
                this.sessionService.userData.hasAllOptions = listEmpresa.length > 0 && listEmpleados.length > 0;
                const dataInput = {
                  id: userLogin.uid,
                  hasAllOptions: this.sessionService.userData.hasAllOptions,
                  empresas: listEmpresa,
                  empleados: listEmpleados
                };
                this.openDialog(dataInput);
              });
          });
        }
      } catch (error) {
        console.log(error);
      }
    });
  }

  logout(event: any): void {
    this.auth.logout();
  }
  openDialog(dataInput: any) {
    const dialogData: DialogDataGeneric = { data: dataInput };
    const dialogRef = this.dialog.open(DialogSelectComponent, {
      width: 'auto',
      disableClose: true,
      data: dialogData,
      maxHeight: '90vh'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'Guardar') {
        this.sessionService.userData = this.sessionService.userData ? this.sessionService.userData : {};
        this.sessionService.userData.tipo = result.data.tipo;
        this.sessionService.userData.idEmpleado = result.data.idEmpleado;
        this.sessionService.userData.idEmpresa = result.data.idEmpresa;
        this.sessionService.obsUserData.next(this.sessionService.userData);
      }
    });
  }
}
