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
    createMenu(roles: string[]) {
        console.log(roles);
    }
}
