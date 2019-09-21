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

    private menuitemCollection2: AngularFirestoreCollection<MenuItem>;
    constructor(
        private afs2: AngularFirestore,
        private fns2: AngularFireFunctions,
        private rolService: RolService,
        private paginaService: PaginaService,
    ) {
        super(afs2, fns2);
        this.menuitemCollection2 = afs2.collection<MenuItem>('menuitem');
    }
    init() {
        this.menuitemCollection2.valueChanges().subscribe((menuItem: MenuItem[]) => {
            if (menuItem.length === 0) {
                this.rolService.list().subscribe((rols: Rol[]) => {
                    this.paginaService.list().subscribe((paginas: Pagina[]) => {
                        rols.forEach(rol => {
                            if (rol.id === 'DEFAULT' ) {
                                paginas.forEach(pagina => {
                                    if (pagina.id === 'HOME') {
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
}
