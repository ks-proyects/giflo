// Import Libraries
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

// Import Services
import { EmpresaService } from '../../../services/empresa.service';
import { EstadoService } from '../../../services/estado.service';
import { UserService } from '../../../services/user.service';

import { Empresa } from '../../../domain/giflo_db/empresa';
import { Estado } from '../../../domain/giflo_db/estado';
import { User } from '../../../domain/giflo_db/user';

// START - USED SERVICES
/**
* EmpresaService.create
*	@description CRUD ACTION create
*
* EmpresaService.get
*	@description CRUD ACTION get
*	@param ObjectId id Id 
*
* EstadoService.list
*	@description CRUD ACTION list
*
* UserService.list
*	@description CRUD ACTION list
*
* EmpresaService.update
*	@description CRUD ACTION update
*	@param ObjectId id Id
*
*/
// END - USED SERVICES

/**
 * This component allows to edit a  Empresa
 */
@Component({
    selector: 'app-empresa-edit',
    templateUrl: 'empresa-edit.component.html',
    styleUrls: ['empresa-edit.component.css']
})
export class EmpresaEditComponent implements OnInit {
    item: any = {};
    itemDoc: AngularFirestoreDocument<Empresa>;
    isNew: Boolean = true;
    formValid: Boolean;

    listEstado: Estado[];
    listUser: User[];


    constructor(
        private empresaService: EmpresaService,
        private estadoService: EstadoService,
        private userService: UserService,
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
                this.itemDoc = this.empresaService.get(id);
                this.itemDoc.valueChanges().subscribe(item => this.item = item);

            }
            // Get relations
            this.estadoService.list().subscribe(list => this.listEstado = list);
            this.userService.list().subscribe(list => this.listUser = list);
        });
    }



    /**
     * Save Empresa
     *
     * @param {boolean} formValid Form validity check
     * @param Empresa item Empresa to save
     */
    save(formValid: boolean): void {
        this.formValid = formValid;
        if (formValid) {
            if (this.isNew) {
                // Create
                this.empresaService.create(this.item);
                this.isNew = false;
            } else {
                // Update
                this.empresaService.update(this.itemDoc, this.item);
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
