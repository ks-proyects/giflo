import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/model/user';
import { Router, ActivatedRoute } from '@angular/router';
import { DaoUserService } from 'src/app/dao/dao-user.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { PushMessagingService } from 'src/app/services/push-messaging.service';

@Component({
  selector: 'app-register-user-data',
  templateUrl: './register-user-data.component.html',
  styleUrls: ['./register-user-data.component.less']
})
export class RegisterUserDataComponent implements OnInit {

  listSexo: any[] = [
    {value: 'Masculino', viewValue: 'Masculino'},
    {value: 'Femenino', viewValue: 'Femenino'},
    {value: 'Otro', viewValue: 'Otro'}
  ];
  listType: any[] = [
    {value: 'Personal', viewValue: 'Personal'},
    {value: 'Empresarial', viewValue: 'Empresarial'}
  ];
  user: User  = {
    id: '',
    fullNames: '',
    names: '',
    lastName: '',
    email: '',
    birthDate: new Date(),
    sexo: '',
    type: '',
    identificacion: '',
    token: ''
  };
  showSpinner: boolean = false;
  constructor(
    private auth: AuthenticationService,
    private router: Router ,
    private arouter: ActivatedRoute,
    private userDAO: DaoUserService,
    private breakpointObserver: BreakpointObserver,
    private msg: PushMessagingService) {
    const uid: any = arouter.snapshot.queryParams[1];
    this.auth.authState().subscribe(
      (result) => {
        if ( result && result.uid) {
          this.user.fullNames = result.displayName ? result.displayName : '';
          this.user.email = result.email ? result.email : '';
          this.user.id = result.uid;
        } else {
        }
      },
      (error) => {
      });
  }

  ngOnInit() {
  }
  finish = () => {
    this.user.fullNames = this.user.fullNames ? this.user.fullNames : this.user.names + ' ' + this.user.lastName;
    this.msg.requestPermission();
    this.msg.listen();
    this.userDAO.create(this.user).then((resp) => {
      this.msg.updateToken(this.user);
      this.router.navigate(['/']);
    }).catch(err => {console.log(err); });
  }
  get isMobile() {
    return this.breakpointObserver.isMatched('(max-width: 767px)');
}

}
