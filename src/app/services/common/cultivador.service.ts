import { Injectable } from '@angular/core';
import { Cama } from '../../domain/giflo_db/cama';
import { ProduccionVariedad } from '../../domain/dto/produccionVariedad';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { ProduccionService } from '../produccion.service';
import { CamaService } from '../cama.service';
import { DiaTrabajoService } from '../dia-trabajo.service';
import { User } from '../../domain/giflo_db/user';
import { leftJoinDocument } from '../generic/leftJoin.service';
import { Produccion } from '../../domain/giflo_db/produccion';
import { ProduccionCama } from '../../domain/dto/produccionCama';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from '../user.service';
import { DiaTrabajo } from 'src/app/domain/giflo_db/dia-trabajo';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CultivadorService {
  private userCurrent: User;
  protected camas: Cama[];
  protected listProduccionVariedad: ProduccionVariedad[] = [];
  protected produccionVariedad: BehaviorSubject<ProduccionVariedad[]>;
  private finishedAllSave: boolean;
  public idDiaTrabajo: string;
  private datePipe: DatePipe;
  constructor(
    private afAuth: AngularFireAuth,
    protected afs: AngularFirestore,
    private produccionService: ProduccionService,
    private camaService: CamaService,
    private userService: UserService,
    private diaTrabajoService: DiaTrabajoService
  ) {
    this.datePipe = new DatePipe('en-US');
    this.finishedAllSave = true;
    this.produccionVariedad = new BehaviorSubject<ProduccionVariedad[]>([]);
    const currentDate = new Date();
    this.afAuth.user.subscribe(loginUser => {
      if (loginUser) {
        this.userService.get(loginUser.uid).valueChanges().subscribe(item => {
          if (item) {
            this.userCurrent = item;
            if (this.userCurrent && this.userCurrent.roles.includes('CULT') && this.userCurrent.currentEmpleado && this.userCurrent.currentIdEmpresa) {
              //Id Dia Actual
              this.idDiaTrabajo = currentDate.getFullYear().toString() + currentDate.getMonth().toString() +
                currentDate.getDate().toString() + this.userCurrent.currentIdEmpresa;
              //Get Camas User
              this.camaService.listUserAndEmpresa(this.userCurrent.currentIdEmpresa, this.userCurrent.currentEmpleado).subscribe(list => {
                this.camas = list;
              });
              //Validamos el Id dia actual
              this.diaTrabajoService.get(this.idDiaTrabajo).valueChanges().subscribe(item => {
                if (!item) {
                  const newItem: DiaTrabajo = { id: this.idDiaTrabajo };
                  newItem.anio = currentDate.getFullYear();
                  newItem.mes = currentDate.getMonth();
                  newItem.fecha = currentDate;
                  newItem.estado = 'VIGENTE';
                  newItem.empresa = this.userCurrent.currentIdEmpresa;
                  newItem.descripcion = 'Producción ' + this.datePipe.transform(currentDate, 'yyyy MM dd');
                  this.diaTrabajoService.createCustom(newItem);
                }
                //Consultamos la produccion del dia de hoy
                this.produccionService.listCultivo(this.userCurrent.currentIdEmpresa, this.idDiaTrabajo, this.userCurrent.currentEmpleado).pipe(
                  leftJoinDocument(this.afs, 'bloque', 'bloque'),
                  leftJoinDocument(this.afs, 'nave', 'nave'),
                  leftJoinDocument(this.afs, 'cama', 'cama'),
                  leftJoinDocument(this.afs, 'variedad', 'variedad'),
                  leftJoinDocument(this.afs, 'diaTrabajo', 'diatrabajo'),
                  leftJoinDocument(this.afs, 'trabajador', 'empleado')
                ).subscribe(list => {
                  if (this.finishedAllSave) {
                    let listAux = list as Produccion[];
                    if (listAux.length === 0) {
                      if (this.camas.length > 0) {
                        this.generateProduccion();
                      }
                    } else {
                      listAux = listAux.filter(prod => prod.estado !== 'CONFIRMADO');
                      this.buildProduccionVariedad(listAux);
                    }
                  }
                });
              });
            }
          }
        });
      }
    });

  }
  getListProduccionVariedad(): Observable<ProduccionVariedad[]> {
    return this.produccionVariedad.asObservable();
  }
  save(item: ProduccionVariedad) {
    this.saveProduccion(item, 'GUARDADO');
  }
  confirm(item: ProduccionVariedad) {
    this.saveProduccion(item, 'CONFIRMADO');
  }
  private saveProduccion(item: ProduccionVariedad, estado: string) {
    this.finishedAllSave = false;
    item.produccionCama.forEach(cama => {
      let noUpdate = true;
      this.produccionService.getCamaProduccion(
        this.userCurrent.currentIdEmpresa,
        this.idDiaTrabajo,
        this.userCurrent.currentEmpleado,
        cama.cama.id,
        item.variedad.id
      ).subscribe(list => {
        if (noUpdate) {
          const itemUpdate: Produccion = list.length > 0 ? list[0] : null;
          if (itemUpdate) {
            itemUpdate.cantidad = cama.cantidad;
            itemUpdate.estado = estado;
            noUpdate = false;
            this.produccionService.update(this.produccionService.get(itemUpdate.id), itemUpdate);
          }
        }
      });
    });
    this.finishedAllSave = true;
  }
  private buildProduccionVariedad(listProduccion) {
    this.listProduccionVariedad = [];
    let listIdVariedad: string[] = [];
    listProduccion.forEach(produccion => {
      let item: ProduccionVariedad = {};
      item.bloque = produccion.bloque;
      item.diaTrabajo = produccion.diaTrabajo;
      item.empresa = produccion.empresa;
      item.estado = produccion.estado;
      item.nave = produccion.nave;
      item.supervisor = produccion.supervisor;
      item.trabajador = produccion.trabajador;
      item.variedad = produccion.variedad;
      item.produccionCama = [];
      if (!listIdVariedad.includes(produccion.variedad.id)) {
        this.listProduccionVariedad.push(item);
        listIdVariedad.push(produccion.variedad.id);
      }
    });
    this.listProduccionVariedad.forEach(produccionVariedad => {
      listProduccion.forEach(produccion => {
        if (produccion.variedad.id === produccionVariedad.variedad.id) {
          let item: ProduccionCama = {};
          item.cama = produccion.cama;
          item.estado = produccion.estado;
          item.cantidad = produccion.cantidad;
          produccionVariedad.produccionCama.push(item);
        }
      });
    });
    //sessionStorage.setItem('produccion-today', JSON.stringify(this.listProduccionVariedad));
    this.produccionVariedad.next(this.listProduccionVariedad);
  }
  private generateProduccion() {
    this.camas.forEach(cama => {
      cama.variedad.forEach(variedad => {
        if (variedad) {
          const produccion: Produccion = {};
          produccion.bloque = cama.bloque;
          produccion.cama = cama.id;
          produccion.nave = cama.nave;
          produccion.diaTrabajo = this.idDiaTrabajo;
          produccion.empresa = this.userCurrent.currentIdEmpresa;
          produccion.trabajador = this.userCurrent.currentEmpleado;
          produccion.estado = 'PENDIENTE';
          produccion.supervisor = cama.supervisor;
          produccion.variedad = variedad.id;
          this.produccionService.create(produccion);
        }
      });
    });
    //sessionStorage.setItem('produccion-today', JSON.stringify([]));
    this.produccionVariedad.next([]);
  }
}
