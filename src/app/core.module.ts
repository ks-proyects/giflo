import { NgModule } from '@angular/core';

/* START MY SERVICES IMPORTS */
// Do not edit this comment content, it will be overwritten in next Skaffolder generation
import { ContactoService } from './services/contacto.service';
import { DireccionService } from './services/direccion.service';
import { EstadoService } from './services/estado.service';
import { EstadoCivilService } from './services/estado-civil.service';
import { MenuItemService } from './services/menu-item.service';
import { PaginaService } from './services/pagina.service';
import { RolService } from './services/rol.service';

/* END MY SERVICES IMPORTS */

import { AuthGuard } from './security/auth.guard';
import { AuthenticationService } from './security/authentication.service';
import { AuthService } from './shared/services/auth.service';
import { CompanyService } from './shared/datasource/company.service';
import { EmployeService } from './shared/datasource/employe.service';
import { UserService } from './shared/datasource/user.service';

import { UserService2 } from './services/user.service2';

@NgModule({
  imports: [],
  providers: [
    /* START PROVIDERS */
// Do not edit this comment content, it will be overwritten in next Skaffolder generation
    ContactoService,
    DireccionService,
    EstadoService,
    EstadoCivilService,
    MenuItemService,
    PaginaService,
    RolService,
    UserService,
 /* END PROVIDERS */
    // SECURITY
    AuthGuard,
    AuthenticationService,
    AuthService,
    CompanyService,
    EmployeService
  ],
  exports: []
})
export class CoreModule {
}
