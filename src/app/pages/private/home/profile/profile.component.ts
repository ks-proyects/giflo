import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { Empresa } from 'src/app/domain/giflo_db/empresa';
import { PersonaService } from 'src/app/services/persona.service';
import { DeviceService } from 'src/app/shared/device.service';
import { DialogService } from 'src/app/util/dialog.service';
import { AddressEditComponent } from '../address-edit/address-edit.component';
import { DialogDataGeneric } from 'src/app/domain/dto/dialog-data-generic';
import { DireccionService } from 'src/app/services/direccion.service';
import { Direccion } from 'src/app/domain/giflo_db/direccion';
import { AngularFirestoreDocument } from '@angular/fire/firestore';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any = {};
  listEmpresa: Empresa[];
  listDirecciones: Direccion[];
  persona: any = { id: '', contacto: {} };
  itemDoc: AngularFirestoreDocument<Direccion>;
  constructor(
    private session: SessionService,
    private empresaServ: EmpresaService,
    private personaServ: PersonaService,
    public device: DeviceService,
    private disSer: DialogService,
    private direccionService: DireccionService) {
    session.getDataUser().subscribe(obj => {
      if (obj.user) {
        this.user = obj.user;
        personaServ.get(obj.user.id).valueChanges().subscribe(emple => {
          this.persona = emple;
          this.persona.fechaNacimiento = this.persona.fechaNacimiento.toDate();
          direccionService.listByPerson(this.persona.id).subscribe(result => { this.listDirecciones = result; });
        });
      }
    });
    empresaServ.listByUser().subscribe(list => { this.listEmpresa = list; });

  }
  ngOnInit() {
  }
  openConfirm(actionInput, dataInput) {
    const dialogData: DialogDataGeneric = { id: -1, action: actionInput, data: dataInput };
    const dialogRef = this.disSer.openDialogCustom(dialogData, AddressEditComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'New') {
        result.data.persona = this.persona.id;
        this.direccionService.create(result.data);
      } else if (result.event === 'Edit') {
        this.itemDoc = this.direccionService.get(result.data.id);
        this.direccionService.update(this.itemDoc, result.data);
      }
    });
  }
}
