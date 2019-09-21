// BASE SERVICE
import { PaginaBaseService } from './base/pagina.base.service';
import { AngularFirestore, DocumentReference, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Pagina } from '../domain/giflo_db/pagina';

export class PaginaService extends PaginaBaseService {

    private paginaCollection2: AngularFirestoreCollection<Pagina>;
    constructor(
        private afs2: AngularFirestore,
        private fns2: AngularFireFunctions
    ) {
        super(afs2 , fns2);
        this.paginaCollection2 = afs2.collection<Pagina>('pagina');
    }
    init() {
        this.paginaCollection2.valueChanges().subscribe((rols: Pagina[]) => {
            if (rols.length === 0) {
                let item: Pagina = {id : 'home', component: 'Home', path: '/home', estado: 'ACT'};
                this.create2(item);
                item = {id : 'bloques', component: 'Bloques', path: '/bloques', estado: 'ACT'};
                this.create2(item);
                item = {id : 'naves', component: 'Naves', path: '/naves', estado: 'ACT'};
                this.create2(item);
                item = {id : 'camas', component: 'Camas', path: '/camas', estado: 'ACT'};
                this.create2(item);
                item = {id : 'empleados', component: 'Empleados', path: '/empleados', estado: 'ACT'};
                this.create2(item);
                item = {id : 'variedads', component: 'Variedads', path: '/variedads', estado: 'ACT'};
                this.create2(item);
                item = {id : 'empresas', component: 'Empresas', path: '/empresas', estado: 'ACT'};
                this.create2(item);
                item = {id : 'estadocivils', component: 'Estadocivils', path: '/estadocivils', estado: 'ACT'};
                this.create2(item);
                item = {id : 'estados', component: 'Estados', path: '/estados', estado: 'ACT'};
                this.create2(item);
                item = {id : 'menuitems', component: 'Menuitems', path: '/menuitems', estado: 'ACT'};
                this.create2(item);
                item = {id : 'paginas', component: 'Paginas', path: '/paginas', estado: 'ACT'};
                this.create2(item);
                item = {id : 'rols', component: 'Rols', path: '/rols', estado: 'ACT'};
                this.create2(item);
            }
        });
    }
    create2(item: Pagina): Promise<void> {
        return this.paginaCollection2.doc(item.id).set(item);
    }

}
