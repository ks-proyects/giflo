import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { SessionService } from 'src/app/services/common/session.service';
import { AuthenticationService } from 'src/app/security/authentication.service';
import { DeviceService } from 'src/app/services/common/device.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DialogDataGeneric } from 'src/app/domain/dto/dialog-data-generic';
import { DialogSelectComponent } from './dialog-select/dialog-select.component';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { leftJoinDocument } from 'src/app/services/generic/leftJoin.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Empleado } from 'src/app/domain/giflo_db/empleado';
import { Subscription } from 'rxjs';
import { Empresa } from 'src/app/domain/giflo_db/empresa';
import { UserService } from 'src/app/services/user.service';
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
  public user: any = { id: '', currentEmpresa: '' };
  private listaEmpresas: Empresa[];
  private listaEmpleados: Empleado[];
  private isOpenDialog = false;
  constructor(
    private auth: AuthenticationService,
    public device: DeviceService,
    private sessionService: SessionService,
    public dialog: MatDialog,
    public empleadoService: EmpleadoService,
    public empresaService: EmpresaService,
    private afs: AngularFirestore,
    private snackBar: MatSnackBar,
    private userService: UserService
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
    this.userInfoSuscription = this.sessionService.getBrowserInfo().subscribe(userInfo => {
      
    });
  }

  logout(event: any): void {
    sessionStorage.clear();
    this.auth.logout();
  }

  openDialog() {
    if (!this.user.currentIdEmpresa) {
      this.changeEmpresa();
    }
  }
  changeEmpresa() {
    //Caso solo posea un empleo y no posea empresa
    if (this.listaEmpresas && this.listaEmpleados && this.user && !this.isOpenDialog) {
      let isFromTemplate = false;
      if (this.listaEmpresas.length === 0 && this.listaEmpleados.length === 1) {
        this.user.currentTipo = 'Empleado';
        this.user.currentIdEmpresa = (this.listaEmpleados[0].empresa as Empresa).id;
        this.user.currentEmpresa = (this.listaEmpleados[0].empresa as Empresa).nombre;
        this.user.currentEmpleado = this.listaEmpleados[0].id;
        this.userService.update(this.userService.get(this.user.id), this.user);
        isFromTemplate = this.user.currentEmpresa !== undefined;
      } else if (this.listaEmpresas.length === 1 && this.listaEmpleados.length === 0) {
        this.user.currentTipo = 'Empresario';
        this.user.currentIdEmpresa = (this.listaEmpresas[0] as Empresa).id;
        this.user.currentEmpresa = (this.listaEmpresas[0] as Empresa).nombre;
        this.userService.update(this.userService.get(this.user.id), this.user);
        isFromTemplate = this.user.currentEmpresa !== undefined;
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
          this.isOpenDialog = true;
          const dialogRef = this.dialog.open(DialogSelectComponent, {
            width: 'auto',
            disableClose: true,
            data: dialogData,
            maxHeight: '90vh'
          });
          dialogRef.afterClosed().subscribe(result => {
            if (result.event === 'Guardar') {
              this.isOpenDialog = false;
              this.user.currentTipo = result.data.tipo;
              this.user.currentIdEmpresa = result.data.empresa.id;
              this.user.currentEmpresa = result.data.empresa.nombre;
              this.userService.update(this.userService.get(this.user.id), this.user);
            }
          });
        }
      }
      if (isFromTemplate) {
        this.openSnackBar('No posees múltiples empresa', 'Mensaje');
      }
    }
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
