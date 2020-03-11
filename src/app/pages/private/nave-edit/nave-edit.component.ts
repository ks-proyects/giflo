// Import Libraries
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

// Import Services
import { NaveService } from '../../../services/nave.service';
import { EstadoService } from '../../../services/estado.service';
import { BloqueService } from '../../../services/bloque.service';

import { Nave } from '../../../domain/giflo_db/nave';
import { Bloque } from '../../../domain/giflo_db/bloque';
import { Estado } from '../../../domain/giflo_db/estado';

// START - USED SERVICES
/**
* NaveService.create
*	@description CRUD ACTION create
*
* NaveService.get
*	@description CRUD ACTION get
*	@param ObjectId id Id 
*
* EstadoService.list
*	@description CRUD ACTION list
*
* BloqueService.list
*	@description CRUD ACTION list
*
* NaveService.update
*	@description CRUD ACTION update
*	@param ObjectId id Id
*
*/
// END - USED SERVICES

/**
 * This component allows to edit a  Nave
 */
@Component({
    selector: 'app-nave-edit',
    templateUrl: 'nave-edit.component.html',
    styleUrls: ['nave-edit.component.css']
})
export class NaveEditComponent implements OnInit {
    item: any = {};
    itemDoc: AngularFirestoreDocument<Nave>;
    isNew: Boolean = true;
    formValid: Boolean;

    listBloque: Bloque[];
    listEstado: Estado[];


    constructor(
        private naveService: NaveService,
        private estadoService: EstadoService,
        private bloqueService: BloqueService,
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
                this.itemDoc = this.naveService.get(id);
                this.itemDoc.valueChanges().subscribe(item => this.item = item);

            }
            // Get relations
            this.bloqueService.list().subscribe(list => this.listBloque = list);
            this.estadoService.list().subscribe(list => this.listEstado = list);
        });
    }



    /**
     * Save Nave
     *
     * @param {boolean} formValid Form validity check
     * @param Nave item Nave to save
     */
    save(formValid: boolean): void {
        this.formValid = formValid;
        if (formValid) {
            if (this.isNew) {
                // Create
                this.naveService.create(this.item);
                this.isNew = false;
            } else {
                // Update
                this.naveService.update(this.itemDoc, this.item);
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
