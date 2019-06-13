import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { User } from 'src/app/shared/model/user';
import { BaseComponent } from '../base.component';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.less']
})
export class PerfilComponent extends BaseComponent implements OnInit {
  user: User;

  constructor(
    public authService: AuthService,
    private med: MediaMatcher,
    private cdr: ChangeDetectorRef
  ) {
    super(med, cdr);
    this.user = this.authService.userDB;
  }
  ngOnInit() {
  }

}
