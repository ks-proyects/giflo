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

    constructor(
        private afs2: AngularFirestore,
        private fns2: AngularFireFunctions
    ) {
        super(afs2, fns2);
    }

    init() {
        this.afs2.collection<Estado>('estado').valueChanges().subscribe((estados: Estado[]) => {
            if (estados.length === 0) {
                let item: Estado = {id : 'ACT', nombre: 'ACTIVO'};
                this.create(item);
                item = {id : 'INAC', nombre: 'INACTIVO'};
                this.create(item);
            }
        });
    }
}
