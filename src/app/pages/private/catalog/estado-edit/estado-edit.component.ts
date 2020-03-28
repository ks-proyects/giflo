// Import Libraries
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

// Import Services
import { EstadoService } from '../../../../services/estado.service';

import { Estado } from '../../../../domain/giflo_db/estado';

// START - USED SERVICES
/**
* EstadoService.create
*	@description CRUD ACTION create
*
* EstadoService.get
*	@description CRUD ACTION get
*	@param ObjectId id Id 
*
* EstadoService.update
*	@description CRUD ACTION update
*	@param ObjectId id Id
*
*/
// END - USED SERVICES

/**
 * This component allows to edit a  Estado
 */
@Component({
    selector: 'app-estado-edit',
    templateUrl: 'estado-edit.component.html',
    styleUrls: ['estado-edit.component.css']
})
export class EstadoEditComponent implements OnInit {
    item: any = {};
    itemDoc: AngularFirestoreDocument<Estado>;
    isNew: Boolean = true;
    formValid: Boolean;



    constructor(
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
                this.itemDoc = this.estadoService.get(id);
                this.itemDoc.valueChanges().subscribe(item => this.item = item);

            }
            // Get relations
        });
    }



    /**
     * Save Estado
     *
     * @param {boolean} formValid Form validity check
     * @param Estado item Estado to save
     */
    save(formValid: boolean): void {
        this.formValid = formValid;
        if (formValid) {
            if (this.isNew) {
                // Create
                this.estadoService.create(this.item);
                this.isNew = false;
            } else {
                // Update
                this.estadoService.update(this.itemDoc, this.item);
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
