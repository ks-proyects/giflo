import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BaseComponent } from '../base.component';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/model/user';

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
