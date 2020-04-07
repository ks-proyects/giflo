import { Component, OnInit } from '@angular/core';
import { PersonaService } from 'src/app/services/persona.service';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { Persona } from 'src/app/domain/giflo_db/persona';
import { Location, DatePipe } from '@angular/common';
import { SessionService } from 'src/app/services/session.service';
import { DeviceService } from 'src/app/shared/device.service';
import { EstadoCivil } from 'src/app/domain/giflo_db/estado-civil';
import { EstadoCivilService } from 'src/app/services/estado-civil.service';
import { ContactoService } from 'src/app/services/contacto.service';
import { DateAdapterService, DATE_FORMATS } from 'src/app/util/date-adapter.service';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';


@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: DateAdapterService },
    { provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS }
  ]
})
export class ProfileEditComponent implements OnInit {
  item: any = { contacto: {} };
  formValid: boolean;
  isNew: boolean;
  itemDoc: AngularFirestoreDocument<Persona>;
  maxDate: Date;
  listTipoIdentificacio: any[] = [
    { value: '', label: '-- SELECCIONA --' },
    { value: 'CÉDULA', label: 'CÉDULA' },
    { value: 'RUC', label: 'RUC' },
    { value: 'PASSAPORTE', label: 'PASSAPORTE' }
  ];
  listEstadoCivil: EstadoCivil[];
  constructor(
    private personaServ: PersonaService,
    private contactoService: ContactoService,
    private location: Location,
    private sessionService: SessionService,
    public device: DeviceService,
    private estadocivilService: EstadoCivilService) {
    this.maxDate = new Date();
  }

  ngOnInit() {
    this.isNew = false;
    this.estadocivilService.list().subscribe(list => this.listEstadoCivil = list);
    this.sessionService.getDataUser().subscribe(data => {

      if (data && data.user) {
        this.itemDoc = this.personaServ.get(data.user.id);
        this.itemDoc.valueChanges().subscribe(item => {
          if (item) {
            this.isNew = false;
            this.item = item;
            this.item.fechaNacimiento = this.item.fechaNacimiento.toDate();
          } else {
            this.isNew = true;
            this.item.id = data.user.id;
            this.item.user = data.user;
            this.item.nombres = data.user.name;
            this.item.apellidos = data.user.surname;
            this.item.contacto = {};
            this.item.contacto.email = data.user.mail;
          }
        });
      }
    });
  }
  /**
     * Save Variedad
     *
     * @param {boolean} formValid Form validity check
     * @param Variedad item Variedad to save
     */
  save(formValid: boolean): void {
    this.formValid = formValid;
    if (formValid && this.isNew !== undefined) {
      this.item.fechaNacimiento = (new DatePipe('en-US')).transform((this.item.fechaNacimiento as Date), 'short');
      if (this.isNew) {
        // Create
        this.contactoService.create(this.item.contacto);
        this.personaServ.createCustom(this.item);
        this.isNew = false;
      } else {
        // Update
        this.personaServ.update(this.itemDoc, this.item).then(resut => {
          console.log(resut);
        }).catch(error => {
          console.log(error);
        });
      }
      this.goBack();
    }
  }

  /**
   * Go Back
   */
  goBack(): void {
    this.location.back();
  }

}
