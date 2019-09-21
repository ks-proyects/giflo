// BASE SERVICE
import { EstadoBaseService } from './base/estado.base.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Estado } from '../domain/giflo_db/estado';


// start documentation
/**
 * Custom APIs
 *
 */
// end documentation

/**
 * YOU CAN OVERRIDE HERE EstadoBaseService
 */
export class EstadoService extends EstadoBaseService {
    init() {
        this.list().subscribe((estados: Estado[]) => {
            if (estados.length === 0) {
                let item: Estado = {id : 'ACT', nombre: 'ACTIVO'};
                this.create(item);
                item = {id : 'INAC', nombre: 'INACTIVO'};
                this.create(item);
            }
        });
    }
}
