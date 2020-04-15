import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { SessionService } from 'src/app/services/session.service';
import { AuthenticationService } from 'src/app/security/authentication.service';
import { DeviceService } from 'src/app/shared/device.service';
import { MatDialog } from '@angular/material';
import { DialogDataGeneric } from 'src/app/domain/dto/dialog-data-generic';
import { DialogSelectComponent } from './dialog-select/dialog-select.component';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { leftJoinDocument } from 'src/app/services/generic/leftJoin.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Empleado } from 'src/app/domain/giflo_db/empleado';
import { UserInfo } from 'src/app/domain/dto/user-info';
import { Subscription } from 'rxjs';
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
  private userSuscription: Subscription;
  private userInfoSuscription: Subscription;
  clickEvent() {
    this.status = !this.status;
  }
  constructor(
    private auth: AuthenticationService,
    public device: DeviceService,
    private sessionService: SessionService,
    public dialog: MatDialog,
    public empleadoService: EmpleadoService,
    public empresaService: EmpresaService,
    private afs: AngularFirestore
  ) {
  }
  ngOnDestroy(): void {
    this.userSuscription.unsubscribe();
    this.userInfoSuscription.unsubscribe();
  }
  ngOnInit() {
    this.userSuscription = this.sessionService.getUser().subscribe(user => {
      if (user) {
        this.userInfoSuscription = this.sessionService.getUserInfo().subscribe(userInfo => {
          if (!userInfo) {
            this.empresaService.listByUser(user.id).subscribe(listEmpresa => {
              this.empleadoService.listByUser(user.id).
                pipe(leftJoinDocument(this.afs, 'empresa', 'empresa')).subscribe(listEmpleado => {
                  const listEmpleados = listEmpleado as Empleado[];
                  const openDialog = listEmpresa.length > 0 || listEmpleados.length > 0;
                  if (openDialog) {
                    const varHasAllOptions = listEmpresa.length > 0 && listEmpleados.length > 0;
                    const dataInput = {
                      id: user.id,
                      hasAllOptions: varHasAllOptions,
                      empresas: listEmpresa,
                      empleados: listEmpleados
                    };
                    this.openDialog(dataInput);
                  }
                });
            });
          }
        });
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
        const userInfo: UserInfo = {};
        userInfo.tipo = result.data.tipo;
        userInfo.idEmpleado = result.data.idEmpleado;
        userInfo.idEmpresa = result.data.idEmpresa;
        this.sessionService.setUserInfo(userInfo);
      }
    });
  }
}
