import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { CompanyService } from 'src/app/dao/company.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { Router } from '@angular/router';
import { BaseComponent } from '../base.component';
import { MediaMatcher } from '@angular/cdk/layout';
import { DialogService } from 'src/app/shared/services/dialog.service';

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
        this.service.initializeFormGroup();
        this.router.navigate(['companyList']);
    }
      onSubmit() {
      }
      onClose() {
        
        this.service.form.reset();
        this.service.initializeFormGroup();
        this.router.navigate(['company']);
      }
      onActive() {
        try {
          const isActive = this.company.status === 'ACTIVO';
          this.dialogService.openConfirmDialog('¿Está seguro de ' +
          (isActive ? 'INACTIVAR' : 'ACTIVAR') + ' esta empresa?').afterClosed().subscribe(res => {
            if (res) {
              this.company.status = (isActive ? 'INACTIVO' : 'ACTIVO');
              this.service.populateForm(this.company);
              this.service.updateCompany(this.service.form.value).then((res) => {
                console.log('sucess', res);
              }).catch((err)=>{
                console.log('error',err);
              });
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
