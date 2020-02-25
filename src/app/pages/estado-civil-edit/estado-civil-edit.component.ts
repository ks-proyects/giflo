// Import Libraries
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

// Import Services
import { EstadoCivilService } from '../../services/estado-civil.service';

import { EstadoCivil } from '../../domain/giflo_db/estado-civil';

// START - USED SERVICES
/**
* EstadoCivilService.create
*	@description CRUD ACTION create
*
* EstadoCivilService.get
*	@description CRUD ACTION get
*	@param ObjectId id Id 
*
* EstadoCivilService.update
*	@description CRUD ACTION update
*	@param ObjectId id Id
*
*/
// END - USED SERVICES

/**
 * This component allows to edit a  EstadoCivil
 */
@Component({
    selector: 'app-estado-civil-edit',
    templateUrl: 'estado-civil-edit.component.html',
    styleUrls: ['estado-civil-edit.component.css']
})
export class EstadoCivilEditComponent implements OnInit {
    item: any = {};
    itemDoc: AngularFirestoreDocument<EstadoCivil>;
    isNew: Boolean = true;
    formValid: Boolean;



    constructor(
        private estadocivilService: EstadoCivilService,
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
                this.itemDoc = this.estadocivilService.get(id);
                this.itemDoc.valueChanges().subscribe(item => this.item = item);

            }
            // Get relations
        });
    }



    /**
     * Save EstadoCivil
     *
     * @param {boolean} formValid Form validity check
     * @param EstadoCivil item EstadoCivil to save
     */
    save(formValid: boolean): void {
        this.formValid = formValid;
        if (formValid) {
            if (this.isNew) {
                // Create
                this.estadocivilService.create(this.item);
                this.isNew = false;
            } else {
                // Update
                this.estadocivilService.update(this.itemDoc, this.item);
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
