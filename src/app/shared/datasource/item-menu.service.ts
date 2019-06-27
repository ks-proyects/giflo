import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ItemMenu } from '../model/item-menu';
import { OpcionMenu } from '../model/opcion-menu';

@Injectable({
  providedIn: 'root'
})
export class ItemMenuService {
  menuItems: ItemMenu[] = [];
  listItemMenu: AngularFirestoreCollection<ItemMenu>;
  constructor(
    private db: AngularFirestore
  ) {
    this.listItemMenu = db.collection<ItemMenu>('itemMenu');
  }
  getMenu(rol: string) {
    this.validMenu();
    this.db.collection<ItemMenu>('itemMenu', ref => ref.where('rol', '==', rol.toString())
    .orderBy('opcion.name')).snapshotChanges().subscribe(dataRes => {
      if (dataRes.length > 0) {
        this.menuItems = dataRes.map(e => {
          return e.payload.doc.data();
        });
      } else {
        this.menuItems = [];
      }
    });
  }
  validMenu() {
    this.db.collection<ItemMenu>('itemMenu').snapshotChanges().subscribe(dataRes => {
      if (dataRes.length === 0) {
        this.createMenu();
      }
    });
  }
  createMenu() {
    //Opciones
    const optCompany: OpcionMenu = {url: 'companyList', name: 'Empresas'};
    const optHome: OpcionMenu = {url: 'home', name: 'Principal'};
    const optAbout: OpcionMenu = {url: 'about', name: 'Acerca de Nosotros'};
    const optContact: OpcionMenu = {url: 'contact', name: 'Contacto'};
    const optEmpleados: OpcionMenu = {url: 'contact', name: 'Empleados'};
    const optBloques: OpcionMenu = {url: 'contact', name: 'Bloques'};
    const optNaves: OpcionMenu = {url: 'contact', name: 'Naves'};
    const optProduccion: OpcionMenu = {url: 'contact', name: 'Producción'};
    const optProduccionIng: OpcionMenu = {url: 'contact', name: 'Ingreso Producción'};
    //SUPERADMIN
    let rolPage = 'SUPERADMIN';
    this.createUpdateMenu({opcion: optCompany, rol: rolPage, estado: true});
    this.createUpdateMenu({opcion: optHome, rol: rolPage, estado: true});
    this.createUpdateMenu({opcion: optAbout, rol: rolPage, estado: true});
    this.createUpdateMenu({opcion: optContact, rol: rolPage, estado: true});

    rolPage = 'DEFAULT';
    this.createUpdateMenu({opcion: optHome, rol: rolPage, estado: true});
    this.createUpdateMenu({opcion: optAbout, rol: rolPage, estado: true});
    this.createUpdateMenu({opcion: optContact, rol: rolPage, estado: true});

    rolPage = 'ADMIN';
    this.createUpdateMenu({opcion: optEmpleados, rol: rolPage, estado: true});
    this.createUpdateMenu({opcion: optBloques, rol: rolPage, estado: true});
    this.createUpdateMenu({opcion: optNaves, rol: rolPage, estado: true});
    this.createUpdateMenu({opcion: optProduccion, rol: rolPage, estado: true});
    this.createUpdateMenu({opcion: optHome, rol: rolPage, estado: true});
    this.createUpdateMenu({opcion: optAbout, rol: rolPage, estado: true});
    this.createUpdateMenu({opcion: optContact, rol: rolPage, estado: true});

    rolPage = 'CULTIVADOR';
    this.createUpdateMenu({opcion: optProduccionIng, rol: rolPage, estado: true});
    rolPage = 'SUPERVISOR';
    this.createUpdateMenu({opcion: optProduccion, rol: rolPage, estado: true});
    rolPage = 'CLASIFICADOR';
    this.createUpdateMenu({opcion: optProduccion, rol: rolPage, estado: true});
  }
  createUpdateMenu(menu: ItemMenu) {
    return this.listItemMenu. add(menu);
  }
}
