// Import Libraries
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

// Import Services
import { RolService } from '../../services/rol.service';
import { EstadoService } from '../../services/estado.service';

import { Rol } from '../../domain/giflo_db/rol';
import { Estado } from '../../domain/giflo_db/estado';

// START - USED SERVICES
/**
* RolService.create
*	@description CRUD ACTION create
*
* RolService.get
*	@description CRUD ACTION get
*	@param ObjectId id Id 
*
* EstadoService.list
*	@description CRUD ACTION list
*
* RolService.update
*	@description CRUD ACTION update
*	@param ObjectId id Id
*
*/
// END - USED SERVICES

/**
 * This component allows to edit a  Rol
 */
@Component({
    selector: 'app-rol-edit',
    templateUrl: 'rol-edit.component.html',
    styleUrls: ['rol-edit.component.css']
})
export class RolEditComponent implements OnInit {
    item: any = {};
    itemDoc: AngularFirestoreDocument<Rol>;
    isNew: Boolean = true;
    formValid: Boolean;

    listActivo: Estado[];


    constructor(
        private rolService: RolService,
        private estadoService: EstadoService,
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
                this.itemDoc = this.rolService.get(id);
                this.itemDoc.valueChanges().subscribe(item => this.item = item);

            }
            // Get relations
            this.estadoService.list().subscribe(list => this.listActivo = list);
        });
    }



    /**
     * Save Rol
     *
     * @param {boolean} formValid Form validity check
     * @param Rol item Rol to save
     */
    save(formValid: boolean): void {
        this.formValid = formValid;
        if (formValid) {
            if (this.isNew) {
                // Create
                this.rolService.create(this.item);
                this.isNew = false;
            } else {
                // Update
                this.rolService.update(this.itemDoc, this.item);
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
