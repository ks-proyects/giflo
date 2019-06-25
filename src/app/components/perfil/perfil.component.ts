import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BaseComponent } from '../base.component';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/model/user';
import { UserService } from '../../shared/datasource/user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.less']
})
export class PerfilComponent extends BaseComponent implements OnInit {
  user: User;
  company: User;
  form: FormGroup = new FormGroup({
    rucCompany: new FormControl(null, [Validators.required, Validators.minLength(10)])
  });
  constructor(
    public afAuth: AngularFireAuth,
    private med: MediaMatcher,
    private cdr: ChangeDetectorRef,
    private ds: UserService
  ) {
    super(med, cdr);
  }
  ngOnInit() {
    this.ds.findByIdCompanySnapshoot(this.afAuth.auth.currentUser.uid).subscribe(dataRes => {
      this.user = dataRes.payload.data();
    });
  }
  onSubmit() {
    if (this.form.valid) {
      this.ds.findById(this.form.value.rucCompany).subscribe(dataRes => {
        if (dataRes.length > 0) {
          dataRes.map(e => {
            this.company = e.payload.doc.data();
            this.user.company = this.company ;
            this.ds.createUpdateUser(this.user, this.afAuth.auth.currentUser.uid);
          });
        } else {
          window.alert('No existe la empresa con el RUC o no se encuentra activo' + this.form.value.rucCompany);
        }
      });
    } else {
      window.alert(this.form.getError);
    }
  }

}
