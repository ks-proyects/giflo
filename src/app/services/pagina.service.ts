// BASE SERVICE
import { PaginaBaseService } from './base/pagina.base.service';
import { AngularFirestore, DocumentReference, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Pagina } from '../domain/giflo_db/pagina';
import { Injectable } from '@angular/core';
import { MenuItemService } from './menu-item.service';
import { MenuItem } from '../domain/giflo_db/menu-item';
import { RolService } from './rol.service';
import { Rol } from '../domain/giflo_db/rol';
@Injectable()
export class PaginaService extends PaginaBaseService {

    private paginaCustomCollection: AngularFirestoreCollection<Pagina>;
    constructor(
        private afs2: AngularFirestore,
        private fns2: AngularFireFunctions,
        private mis: MenuItemService,
        private rs: RolService
    ) {
        super(afs2, fns2);
        this.paginaCustomCollection = afs2.collection<Pagina>('pagina');
    }
    init() {
        this.list().subscribe((rols: Pagina[]) => {
            if (rols.length === 0) {
                this.rs.get('SUPERADMIN').valueChanges().subscribe(rol => {
                    this.createPaginaMenu('home', 'home', 'Inicio', '/index', rol);
                    this.createPaginaMenu('catalog', 'estadocivils', 'Estados Civiles', '/estadocivils', rol);
                    this.createPaginaMenu('catalog', 'estados', 'Estados', '/estados', rol);
                    this.createPaginaMenu('security', 'empresas', 'Empresas', '/empresas', rol);
                    this.createPaginaMenu('security', 'paginas', 'Paginas', '/paginas', rol);
                    this.createPaginaMenu('security', 'rols', 'Roles', '/rols', rol);
                });
                this.rs.get('GER').valueChanges().subscribe(rol => {
                    this.createPaginaMenu('home', 'home', 'Inicio', '/index', rol);
                    this.createPaginaMenu('management', 'empleados', 'Empleados', '/empleados', rol);
                    this.createPaginaMenu('security', 'menuitems', 'Menú Items', '/menuitems', rol);
                });
                this.createPaginaMenu('admin', 'bloques', 'Bloques', '/bloques');
                this.createPaginaMenu('admin', 'naves', 'Naves', '/naves');
                this.createPaginaMenu('admin', 'camas', 'Camas', '/camas');
                this.createPaginaMenu('admin', 'variedades', 'Variedades', '/variedades');
                this.createPaginaMenu('home', 'produccion', 'Producción', '/produccion');
            }
        });
    }
    createPaginaMenu(seccionP: string, idP: string, componentP: string, pathP: string, rolP?: Rol) {
        const item: any = { id: idP, component: componentP, path: pathP, estado: 'ACT', seccion: seccionP };
        this.paginaCustomCollection.doc(item.id).set(item);
        if (rolP) {
            const mi: any = { pagina: item.id, rol: rolP.id, estado: true };
            this.mis.createCustom(mi);
        }
    }



}
