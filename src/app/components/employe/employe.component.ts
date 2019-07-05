import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BaseComponent } from '../base.component';
import { MediaMatcher } from '@angular/cdk/layout';
import { CompanyService } from 'src/app/shared/datasource/company.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { Router } from '@angular/router';
import { EmployeService } from 'src/app/shared/datasource/employe.service';
import { ItemMenuService } from 'src/app/shared/datasource/item-menu.service';

@Component({
  selector: 'app-employe',
  templateUrl: './employe.component.html',
  styleUrls: ['./employe.component.less']
})
export class EmployeComponent extends BaseComponent implements OnInit {

  full: boolean = true;
  company: any;
  imageChangedEvent: any = '';
    croppedImage: any = '';
    constructor(
      private med: MediaMatcher,
      private cdr: ChangeDetectorRef,
      public service: EmployeService,
      private notificationService: MessageService,
      private dialogService: DialogService,
      public menu: ItemMenuService,
      public router: Router) {
          super(med, cdr);
          this.company = service.form.value;
     }

    ngOnInit() {
    }
    onClear() {
        this.service.form.reset();
        this.service.initFormEmploye();
        this.router.navigate(['employees']);
    }
      onSubmit() {
      }
      onClose() {
        this.service.form.reset();
        this.service.initFormEmploye();
        this.router.navigate(['employe']);
      }
      onActive() {
        try {
          this.service.updateEmployeForm(this.service.form.value, this.service.form.value.$key);
          this.notificationService.warn('Actualizado exitosamente!');
        } catch (error) {
          console.log(error);
        }
      }
      hasMore = () => {
      }
      handleScroll = (scrolled: boolean) => {
        true;
      }

}
