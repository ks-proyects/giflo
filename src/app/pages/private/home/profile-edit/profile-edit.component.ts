import { Component, OnInit } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Location } from '@angular/common';
import { SessionService } from 'src/app/services/session.service';
import { DeviceService } from 'src/app/shared/device.service';
import { EstadoCivil } from 'src/app/domain/giflo_db/estado-civil';
import { EstadoCivilService } from 'src/app/services/estado-civil.service';
import { User } from 'src/app/domain/giflo_db/user';
import { UserService } from 'src/app/services/user.service';
import { leftJoinDocument } from 'src/app/services/generic/leftJoin.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {
  item: User ;
  formValid: boolean;
  isNew: boolean;
  itemDoc: AngularFirestoreDocument<User>;
  maxDate: Date;
  dateSelect: any;
  listTipoIdentificacio: any[] = [
    { value: '', label: '-- SELECCIONA --' },
    { value: 'CÉDULA', label: 'CÉDULA' },
    { value: 'RUC', label: 'RUC' },
    { value: 'PASSAPORTE', label: 'PASSAPORTE' }
  ];
  listEstadoCivil: EstadoCivil[];
  constructor(
    private userService: UserService,
    private location: Location,
    private sessionService: SessionService,
    public device: DeviceService,
    private estadocivilService: EstadoCivilService
  ) {
    this.maxDate = new Date();
  }
  ngOnInit() {
    this.isNew = false;
    this.estadocivilService.list().subscribe(list => this.listEstadoCivil = list);
    this.sessionService.getDataUser().subscribe(data => {
      if (data && data.user) {
        this.itemDoc = this.userService.get(data.user.id);
        this.itemDoc.valueChanges().subscribe(item => {
          if (item) {
            this.isNew = false;
            this.item = item;
            this.item.fechaNacimiento = this.item.fechaNacimiento;
          }
        });
      }
    });
  }

  save(formValid: boolean): void {
    this.formValid = formValid;
    if (formValid && this.isNew !== undefined) {
      this.userService.update(this.itemDoc, this.item).then(resut => {
        console.log(resut);
      }).catch(error => {
        console.log(error);
      });
    }
    this.location.back();
  }
  goBack(): void {
    this.location.back();
  }
}
