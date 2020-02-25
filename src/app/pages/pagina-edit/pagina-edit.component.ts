// Import Libraries
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

// Import Services
import { PaginaService } from '../../services/pagina.service';
import { EstadoService } from '../../services/estado.service';

import { Pagina } from '../../domain/giflo_db/pagina';
import { Estado } from '../../domain/giflo_db/estado';

// START - USED SERVICES
/**
* PaginaService.create
*	@description CRUD ACTION create
*
* PaginaService.get
*	@description CRUD ACTION get
*	@param ObjectId id Id 
*
* EstadoService.list
*	@description CRUD ACTION list
*
* PaginaService.update
*	@description CRUD ACTION update
*	@param ObjectId id Id
*
*/
// END - USED SERVICES

/**
 * This component allows to edit a  Pagina
 */
@Component({
    selector: 'app-pagina-edit',
    templateUrl: 'pagina-edit.component.html',
    styleUrls: ['pagina-edit.component.css']
})
export class PaginaEditComponent implements OnInit {
    item: any = {};
    itemDoc: AngularFirestoreDocument<Pagina>;
    isNew: Boolean = true;
    formValid: Boolean;

    listEstado: Estado[];


    constructor(
        private paginaService: PaginaService,
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
                this.itemDoc = this.paginaService.get(id);
                this.itemDoc.valueChanges().subscribe(item => this.item = item);

            }
            // Get relations
            this.estadoService.list().subscribe(list => this.listEstado = list);
        });
    }



    /**
     * Save Pagina
     *
     * @param {boolean} formValid Form validity check
     * @param Pagina item Pagina to save
     */
    save(formValid: boolean): void {
        this.formValid = formValid;
        if (formValid) {
            if (this.isNew) {
                // Create
                this.paginaService.create(this.item);
                this.isNew = false;
            } else {
                // Update
                this.paginaService.update(this.itemDoc, this.item);
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
