import { Component, OnInit, ViewChild, Input, ComponentFactoryResolver, OnDestroy, ContentChild } from '@angular/core';
import { CultivoComponent } from '../cultivo/cultivo.component';
import { GerenteComponent } from '../gerente/gerente.component';
import { PostcosechaComponent } from '../postcosecha/postcosecha.component';
import { SupervisorComponent } from '../supervisor/supervisor.component';
import { HomeDirective } from 'src/app/directives/home.directive';
import { Subscription } from 'rxjs';
import { SessionService } from 'src/app/services/session.service';
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
    this.userSuscription = this.session.getUser().subscribe(user => {
      if (user) {
        if (user.roles.includes('CULT')) {
          this.agregarCard('1');
        }
        else if (user.roles.includes('GER') || user.roles.includes('ADM')) {
          this.agregarCard('2');
        }
        else if (user.roles.includes('POST') || user.roles.includes('COCH') || user.roles.includes('SUPPOST') || user.roles.includes('FUMN')) {
          this.agregarCard('3');
        }
        else if (user.roles.includes('SUPCU')) {
          this.agregarCard('4');
        }
        else if (user.roles.includes('SUPERADMIN')) {
          this.agregarCard('5');
        } else {
          this.agregarCard('6');
        }
      }
    });
  }
  ngOnDestroy(): void {
    this.userSuscription.unsubscribe();
  }

  ngOnInit() {
  }
  agregarCard(id) {
    let miComponent: any;
    switch (id) {
      case '1':
        miComponent = CultivoComponent;
        break;
      case '2':
        miComponent = GerenteComponent;
        break;
      case '3':
        miComponent = PostcosechaComponent;
        break;
      case '4':
        miComponent = SupervisorComponent;
        break;
      case '5':
        miComponent = SuperAdminComponent;
        break;
      case '6':
        miComponent = DefaultComponent;
        break;
    }
    if (miComponent) {
      let componentFactory = this.componentFactoryResolver.resolveComponentFactory(miComponent);
      let viewContainerRef = this.receptor.viewContainerRef;
      viewContainerRef.clear();
      viewContainerRef.createComponent(componentFactory);
    }
  }

}
