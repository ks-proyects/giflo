// BASE SERVICE
import { RolBaseService } from './base/rol.base.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Rol } from '../domain/giflo_db/rol';


// start documentation
/**
 * Custom APIs
 *
 */
// end documentation

/**
 * YOU CAN OVERRIDE HERE RolBaseService
 */
export class RolService extends RolBaseService {
    init() {
        this.list().subscribe((rols: Rol[]) => {
            if (rols.length === 0) {
                let item: Rol = {id : 'DEF', nombre: 'DEFAULT', activo: 'ACT'};
                this.create(item);
                item = {id : 'GER', nombre: 'GERENTE', activo: 'ACT'};
                this.create(item);
                item = {id : 'CULT', nombre: 'CULTIVADOR', activo: 'ACT'};
                this.create(item);
                item = {id : 'POST', nombre: 'POSTCOSECHA', activo: 'ACT'};
                this.create(item);
                item = {id : 'FUMN', nombre: 'FUNIGADORES', activo: 'ACT'};
                this.create(item);
                item = {id : 'COCH', nombre: 'COCHEROS', activo: 'ACT'};
                this.create(item);
                item = {id : 'SUPCU', nombre: 'SUPERVISOR DE CULTIVO', activo: 'ACT'};
                this.create(item);
                item = {id : 'SUPPOST', nombre: 'SUPERVISOR DE POSTCOSECHA', activo: 'ACT'};
                this.create(item);
                item = {id : 'VEND', nombre: 'VENDEDOR', activo: 'ACT'};
                this.create(item);
                item = {id : 'ADM', nombre: 'ADMINISTRADOR', activo: 'ACT'};
                this.create(item);
            }
        });
    }
}
