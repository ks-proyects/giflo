import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { BaseComponent } from '../base.component';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-save-user-data',
  templateUrl: './save-user-data.component.html',
  styleUrls: ['./save-user-data.component.less']
})
export class SaveUserDataComponent extends BaseComponent implements OnInit {

  listSexo: any[] = [
    {value: 'Masculino', viewValue: 'Masculino'},
    {value: 'Femenino', viewValue: 'Femenino'},
    {value: 'Otro', viewValue: 'Otro'}
  ];
  listType: any[] = [
    {value: 'Personal', viewValue: 'Personal'},
    {value: 'Empresarial', viewValue: 'Empresarial'}
  ];
  constructor(
    public authService: AuthService,
    private med: MediaMatcher,
    private cdr: ChangeDetectorRef) { 
    super(med, cdr);
  }

  ngOnInit() {
  }

}
