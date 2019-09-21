// BASE SERVICE
import { MenuItemBaseService } from './base/menu-item.base.service';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { MenuItem } from '../domain/giflo_db/menu-item';
import { AngularFireFunctions } from '@angular/fire/functions';
import { RolService } from './rol.service';
import { PaginaService } from './pagina.service';
import { Rol } from '../domain/giflo_db/rol';
import { Pagina } from '../domain/giflo_db/pagina';


// start documentation
/**
 * Custom APIs
 *
 */
// end documentation

/**
 * YOU CAN OVERRIDE HERE MenuItemBaseService
 */
export class MenuItemService extends MenuItemBaseService {
    init(rolService: RolService, paginaService: PaginaService) {
        this.list().subscribe((menuItem: MenuItem[]) => {
            if (menuItem.length === 0) {
                rolService.list().subscribe((rols: Rol[]) => {
                    paginaService.list().subscribe((paginas: Pagina[]) => {
                        rols.forEach(rol => {
                            if (rol.id === 'DEF' ) {
                                paginas.forEach(pagina => {
                                    if (pagina.id === 'home') {
                                        const newMenuItem: MenuItem = {id: '', pagina: pagina.id, rol: rol.id, estado: true};
                                        this.create(newMenuItem);
                                    }
                                });
                            }
                            if (rol.id === 'ADM' ) {
                                paginas.forEach(pagina => {
                                    if (pagina.id === 'home'
                                    || pagina.id === 'empresas'
                                    || pagina.id === 'estadocivils'
                                    || pagina.id === 'estados'
                                    || pagina.id === 'paginas'
                                    || pagina.id === 'rols'
                                    ) {
                                        const newMenuItem: MenuItem = {id: '', pagina: pagina.id, rol: rol.id, estado: true};
                                        this.create(newMenuItem);
                                    }
                                });
                            }
                            if (rol.id === 'GERENTE' ) {
                                paginas.forEach(pagina => {
                                    if (pagina.id === 'home'
                                    || pagina.id === 'empleados'
                                    || pagina.id === 'variedads'
                                    || pagina.id === 'bloques'
                                    ) {
                                        const newMenuItem: MenuItem = {id: '', pagina: pagina.id, rol: rol.id, estado: true};
                                        this.create(newMenuItem);
                                    }
                                });
                            }
                            if (rol.id === 'SUPCU' ) {
                                paginas.forEach(pagina => {
                                    if (pagina.id === 'home'
                                    || pagina.id === 'camas'
                                    || pagina.id === 'naves'
                                    ) {
                                        const newMenuItem: MenuItem = {id: '', pagina: pagina.id, rol: rol.id, estado: true};
                                        this.create(newMenuItem);
                                    }
                                });
                            }
                        });
                    });
                });
            }
        });
    }
    createMenu(roles: string[]) {
        console.log(roles);
    }
}
