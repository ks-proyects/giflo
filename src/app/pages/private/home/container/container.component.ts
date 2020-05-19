import { Component, OnInit, ViewChild, Input, ComponentFactoryResolver, OnDestroy, ContentChild } from '@angular/core';
import { CultivoComponent } from '../cultivo/cultivo.component';
import { GerenteComponent } from '../gerente/gerente.component';
import { PostcosechaComponent } from '../postcosecha/postcosecha.component';
import { SupervisorComponent } from '../supervisor/supervisor.component';
import { HomeDirective } from 'src/app/directives/home.directive';
import { Subscription } from 'rxjs';
import { SessionService } from 'src/app/services/common/session.service';
import { SuperAdminComponent } from '../super-admin/super-admin.component';
import { DefaultComponent } from '../default/default.component';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styles: []
})
export class ContainerComponent implements OnInit, OnDestroy {

  @ViewChild(HomeDirective, { static: true }) receptor: HomeDirective;
  @Input() compo: any;
  userSuscription: Subscription;
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private session: SessionService) {

  }
  ngOnDestroy(): void {
    this.userSuscription.unsubscribe();
  }

  ngOnInit() {
    if(this.receptor){
      this.receptor.viewContainerRef.clear();
    }
    this.userSuscription = this.session.getUser().subscribe(user => {
      if (user) {
        if (user.roles.includes('CULT')) {
          this.agregarCard(CultivoComponent);
        }
        else if (user.roles.includes('GER') || user.roles.includes('ADM')) {
          this.agregarCard(GerenteComponent);
        }
        else if (user.roles.includes('POST') || user.roles.includes('COCH') || user.roles.includes('SUPPOST') || user.roles.includes('FUMN')) {
          this.agregarCard(PostcosechaComponent);
        }
        else if (user.roles.includes('SUPCU')) {
          this.agregarCard(SupervisorComponent);
        }
        else if (user.roles.includes('SUPERADMIN')) {
          this.agregarCard(SuperAdminComponent);
        } else {
          this.agregarCard(DefaultComponent);
        }
      }
    });
  }
  agregarCard(miComponent: any) {
    if (miComponent) {
      let componentFactory = this.componentFactoryResolver.resolveComponentFactory(miComponent);
      if (this.receptor) {
        let viewContainerRef = this.receptor.viewContainerRef;
        viewContainerRef.clear();
        viewContainerRef.createComponent(componentFactory);
      }

    }
  }

}
