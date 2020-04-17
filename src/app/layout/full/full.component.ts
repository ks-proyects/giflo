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
import { Empresa } from 'src/app/domain/giflo_db/empresa';
import { User } from 'src/app/domain/giflo_db/user';
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
  private empresaSuscription: Subscription;
  private empresaEmpleadoSuscription: Subscription;
  private user: User;
  private listaEmpresas: Empresa[];
  private listaEmpleados: Empleado[];
  private userInfo: UserInfo = {};
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
    this.empresaSuscription.unsubscribe();
    this.empresaEmpleadoSuscription.unsubscribe();
  }
  ngOnInit() {
    this.userSuscription = this.sessionService.getUser().subscribe(user => {
      if (user) {
        this.user = user;
        this.empresaSuscription = this.empresaService.listByUserActive(user.id).subscribe(listEmpresa => {
          this.listaEmpresas = listEmpresa;
          this.openDialog();
        });
        this.empresaEmpleadoSuscription = this.empleadoService.listByUserActive(user.id).
          pipe(leftJoinDocument(this.afs, 'empresa', 'empresa')).subscribe(listEmpleado => {
            this.listaEmpleados = listEmpleado as Empleado[];
            this.openDialog();
          });
      }
    });
    this.userInfoSuscription = this.sessionService.getUserInfo().subscribe(userInfo => {
      this.userInfo = userInfo;
      this.openDialog();
    });
  }

  logout(event: any): void {
    this.auth.logout();
  }
  openDialog() {
    if (this.listaEmpresas && this.listaEmpleados && this.user && !this.userInfo) {
      //Caso solo posea un empleo y no posea emprea
      if (this.listaEmpresas.length === 0 && this.listaEmpleados.length === 1) {
        const userInfo: UserInfo = {};
        userInfo.tipo = 'Empleado';
        userInfo.idEmpresa = (this.listaEmpleados[0].empresa as Empresa).id;
        this.sessionService.setUserInfo(userInfo);
      } else if (this.listaEmpresas.length === 1 && this.listaEmpleados.length === 0) {
        const userInfo: UserInfo = {};
        userInfo.tipo = 'Empresario';
        userInfo.idEmpresa = (this.listaEmpresas[0] as Empresa).id;
        this.sessionService.setUserInfo(userInfo);
      } else {
        const openDialog = this.listaEmpresas.length > 0 || this.listaEmpleados.length > 0;
        if (openDialog) {
          const varHasAllOptions = this.listaEmpresas.length > 0 && this.listaEmpleados.length > 0;
          const dataInput = {
            id: this.user.id,
            hasAllOptions: varHasAllOptions,
            empresas: this.listaEmpresas,
            empleados: this.listaEmpleados
          };
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
              userInfo.idEmpresa = result.data.idEmpresa;
              this.sessionService.setUserInfo(userInfo);
            }
          });
        }
      }
    }
  }
}
