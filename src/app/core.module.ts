import { NgModule } from '@angular/core';

/* START MY SERVICES IMPORTS */
// Do not edit this comment content, it will be overwritten in next Skaffolder generation
import { BloqueService } from './services/bloque.service';
import { CamaService } from './services/cama.service';
import { ContactoService } from './services/contacto.service';
import { DireccionService } from './services/direccion.service';
import { EmpleadoService } from './services/empleado.service';
import { EmpresaService } from './services/empresa.service';
import { EstadoService } from './services/estado.service';
import { EstadoCivilService } from './services/estado-civil.service';
import { MenuItemService } from './services/menu-item.service';
import { NaveService } from './services/nave.service';
import { PaginaService } from './services/pagina.service';
import { RolService } from './services/rol.service';
import { UserService } from './services/user.service';
import { VariedadService } from './services/variedad.service';

/* END MY SERVICES IMPORTS */

import { AuthGuard } from './security/auth.guard';
import { AuthenticationService } from './security/authentication.service';
import { AuthService } from './shared/services/auth.service';
import { CompanyService } from './shared/datasource/company.service';
import { EmployeService } from './shared/datasource/employe.service';
import { UserDBService } from './shared/datasource/user.db.service';

@NgModule({
  imports: [],
  providers: [
    /* START PROVIDERS */
// Do not edit this comment content, it will be overwritten in next Skaffolder generation
    BloqueService,
    CamaService,
    ContactoService,
    DireccionService,
    EmpleadoService,
    EmpresaService,
    EstadoService,
    EstadoCivilService,
    MenuItemService,
    NaveService,
    PaginaService,
    RolService,
    UserService,
    VariedadService,
 /* END PROVIDERS */
    // SECURITY
    AuthGuard,
    AuthenticationService,
    AuthService,
    CompanyService,
    EmployeService,
    UserDBService
  ],
  exports: []
})
export class CoreModule {
}
