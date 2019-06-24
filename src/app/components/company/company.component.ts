import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '../base.component';
import { MediaMatcher } from '@angular/cdk/layout';
import { CompanyService } from '../../shared/datasource/company.service';
import { MessageService } from '../../shared/services/message.service';
import { DialogService } from '../../shared/services/dialog.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.less']
})
export class CompanyComponent extends BaseComponent implements OnInit {

  full: boolean = true;
  company: any;
  imageChangedEvent: any = '';
    croppedImage: any = '';
    constructor(
      private med: MediaMatcher,
      private cdr: ChangeDetectorRef,
      public service: CompanyService,
      private notificationService: MessageService,
      private dialogService: DialogService,
      public router: Router) {
          super(med, cdr);
          this.company = service.form.value;
     }

    ngOnInit() {
    }
    onClear() {
        this.service.form.reset();
        this.service.initFormCompany();
        this.router.navigate(['companyList']);
    }
      onSubmit() {
      }
      onClose() {
        this.service.form.reset();
        this.service.initFormCompany();
        this.router.navigate(['company']);
      }
      onActive() {
        try {
          const isActive = this.company.status === 'ACTIVO';
          this.dialogService.openConfirmDialog('¿Está seguro de ' +
          (isActive ? 'INACTIVAR' : 'ACTIVAR') + ' esta empresa?').afterClosed().subscribe(res => {
            if (res) {
              this.company.status = (isActive ? 'INACTIVO' : 'ACTIVO');
              this.service.populateFormCompany(this.company);
              this.service.updateCompanyForm(this.service.form.value, this.service.form.value.$key);
              this.notificationService.warn((isActive ? 'Inactivado' : 'Activado') + ' exitosamente!');
            }
          });
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
