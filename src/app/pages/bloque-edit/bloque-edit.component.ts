// Import Libraries
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

// Import Services
import { BloqueService } from '../../services/bloque.service';
import { EstadoService } from '../../services/estado.service';
import { EmpresaService } from '../../services/empresa.service';

import { Bloque } from '../../domain/giflo_db/bloque';
import { Empresa } from '../../domain/giflo_db/empresa';
import { Estado } from '../../domain/giflo_db/estado';

// START - USED SERVICES
/**
* BloqueService.create
*	@description CRUD ACTION create
*
* BloqueService.get
*	@description CRUD ACTION get
*	@param ObjectId id Id 
*
* EstadoService.list
*	@description CRUD ACTION list
*
* EmpresaService.list
*	@description CRUD ACTION list
*
* BloqueService.update
*	@description CRUD ACTION update
*	@param ObjectId id Id
*
*/
// END - USED SERVICES

/**
 * This component allows to edit a  Bloque
 */
@Component({
    selector: 'app-bloque-edit',
    templateUrl: 'bloque-edit.component.html',
    styleUrls: ['bloque-edit.component.css']
})
export class BloqueEditComponent implements OnInit {
    item: any = {};
    itemDoc: AngularFirestoreDocument<Bloque>;
    isNew: Boolean = true;
    formValid: Boolean;

    listEmpresa: Empresa[];
    listEstado: Estado[];


    constructor(
        private bloqueService: BloqueService,
        private estadoService: EstadoService,
        private empresaService: EmpresaService,
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
                this.itemDoc = this.bloqueService.get(id);
                this.itemDoc.valueChanges().subscribe(item => this.item = item);

            }
            // Get relations
            this.empresaService.list().subscribe(list => this.listEmpresa = list);
            this.estadoService.list().subscribe(list => this.listEstado = list);
        });
    }



    /**
     * Save Bloque
     *
     * @param {boolean} formValid Form validity check
     * @param Bloque item Bloque to save
     */
    save(formValid: boolean): void {
        this.formValid = formValid;
        if (formValid) {
            if (this.isNew) {
                // Create
                this.bloqueService.create(this.item);
                this.isNew = false;
            } else {
                // Update
                this.bloqueService.update(this.itemDoc, this.item);
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
