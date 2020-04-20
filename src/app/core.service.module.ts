import { NgModule } from '@angular/core';

/* START MY SERVICES IMPORTS */
// Do not edit this comment content, it will be overwritten in next Skaffolder generation
import { BloqueService } from './services/bloque.service';
import { CamaService } from './services/cama.service';
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
import { DiaTrabajoService } from './services/dia-trabajo.service';
import { ProduccionService } from './services/produccion.service';

@NgModule({
  imports: [],
  providers: [
    /* START PROVIDERS */
// Do not edit this comment content, it will be overwritten in next Skaffolder generation
    BloqueService,
    CamaService,
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
    DiaTrabajoService,
    ProduccionService,
 /* END PROVIDERS */
    // SECURITY
    AuthGuard,
    AuthenticationService
  ],
  exports: []
})
export class CoreServiceModule {
}
