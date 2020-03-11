// Import Libraries
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

// Import Services
import { MenuItemService } from '../../../services/menu-item.service';
import { RolService } from '../../../services/rol.service';
import { PaginaService } from '../../../services/pagina.service';

import { MenuItem } from '../../../domain/giflo_db/menu-item';
import { Pagina } from '../../../domain/giflo_db/pagina';
import { Rol } from '../../../domain/giflo_db/rol';

// START - USED SERVICES
/**
* MenuItemService.create
*	@description CRUD ACTION create
*
* MenuItemService.get
*	@description CRUD ACTION get
*	@param ObjectId id Id 
*
* RolService.list
*	@description CRUD ACTION list
*
* PaginaService.list
*	@description CRUD ACTION list
*
* MenuItemService.update
*	@description CRUD ACTION update
*	@param ObjectId id Id
*
*/
// END - USED SERVICES

/**
 * This component allows to edit a  MenuItem
 */
@Component({
    selector: 'app-menu-item-edit',
    templateUrl: 'menu-item-edit.component.html',
    styleUrls: ['menu-item-edit.component.css']
})
export class MenuItemEditComponent implements OnInit {
    item: any = {};
    itemDoc: AngularFirestoreDocument<MenuItem>;
    isNew: Boolean = true;
    formValid: Boolean;

    listPagina: Pagina[];
    listRol: Rol[];


    constructor(
        private menuitemService: MenuItemService,
        private rolService: RolService,
        private paginaService: PaginaService,
        private route: ActivatedRoute,
        private location: Location) {
        // Init list
    }

    /**
     * Init
     */
    ngOnInit() {
        this.route.params.subscribe(param => {
            const id: string = param['id'];
            if (id !== 'new') {
                this.isNew = false;
                this.itemDoc = this.menuitemService.get(id);
                this.itemDoc.valueChanges().subscribe(item => this.item = item);

            }
            // Get relations
            this.paginaService.list().subscribe(list => this.listPagina = list);
            this.rolService.list().subscribe(list => this.listRol = list);
        });
    }



    /**
     * Save MenuItem
     *
     * @param {boolean} formValid Form validity check
     * @param MenuItem item MenuItem to save
     */
    save(formValid: boolean): void {
        this.formValid = formValid;
        if (formValid) {
            if (this.isNew) {
                // Create
                this.menuitemService.create(this.item);
                this.isNew = false;
            } else {
                // Update
                this.menuitemService.update(this.itemDoc, this.item);
            }
            this.goBack();
        }
    }

    /**
     * Go Back
     */
    goBack(): void {
        this.location.back();
    }

}
