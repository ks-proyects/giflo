// Import Libraries
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

// Import Services
import { CamaService } from '../../../../services/cama.service';
import { EmpleadoService } from '../../../../services/empleado.service';
import { NaveService } from '../../../../services/nave.service';
import { VariedadService } from '../../../../services/variedad.service';
import { EstadoService } from '../../../../services/estado.service';

import { Cama } from '../../../../domain/giflo_db/cama';
import { Estado } from '../../../../domain/giflo_db/estado';
import { Nave } from '../../../../domain/giflo_db/nave';
import { Empleado } from '../../../../domain/giflo_db/empleado';
import { Variedad } from '../../../../domain/giflo_db/variedad';

// START - USED SERVICES
/**
* CamaService.create
*	@description CRUD ACTION create
*
* CamaService.get
*	@description CRUD ACTION get
*	@param ObjectId id Id 
*
* EmpleadoService.list
*	@description CRUD ACTION list
*
* NaveService.list
*	@description CRUD ACTION list
*
* VariedadService.list
*	@description CRUD ACTION list
*
* EmpleadoService.list
*	@description CRUD ACTION list
*
* EstadoService.list
*	@description CRUD ACTION list
*
* CamaService.update
*	@description CRUD ACTION update
*	@param ObjectId id Id
*
*/
// END - USED SERVICES

/**
 * This component allows to edit a  Cama
 */
@Component({
    selector: 'app-cama-edit',
    templateUrl: 'cama-edit.component.html',
    styleUrls: ['cama-edit.component.css']
})
export class CamaEditComponent implements OnInit {
    item: any = {};
    itemDoc: AngularFirestoreDocument<Cama>;
    isNew: Boolean = true;
    formValid: Boolean;

    listEstado: Estado[];
    listNave: Nave[];
    listSupervisor: Empleado[];
    listTrabajador: Empleado[];
    listVariedad: Variedad[];


    constructor(
        private camaService: CamaService,
        private empleadoService: EmpleadoService,
        private naveService: NaveService,
        private variedadService: VariedadService,
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
                this.itemDoc = this.camaService.get(id);
                this.itemDoc.valueChanges().subscribe(item => this.item = item);

            }
            // Get relations
            this.estadoService.list().subscribe(list => this.listEstado = list);
            this.naveService.list().subscribe(list => this.listNave = list);
            this.empleadoService.list().subscribe(list => this.listSupervisor = list);
            this.empleadoService.list().subscribe(list => this.listTrabajador = list);
            this.variedadService.list().subscribe(list => this.listVariedad = list);
        });
    }


    /**
     * Check if an Variedad is in  variedad
     *
     * @param {string} id Id of Variedad to search
     * @returns {boolean} True if it is found
     */
    containVariedad(id: string): boolean {
        if (!this.item.variedad) return false;
        return this.item.variedad.indexOf(id) !== -1;
    }

    /**
     * Add Variedad from Cama
     *
     * @param {string} id Id of Variedad to add in this.item.variedad array
     */
    addVariedad(id: string) {
        if (!this.item.variedad)
            this.item.variedad = [];
        this.item.variedad.push(id);
    }

    /**
     * Remove an Variedad from a Cama
     *
     * @param {number} index Index of Variedad in this.item.variedad array
     */
    removeVariedad(index: number) {
        this.item.variedad.splice(index, 1);
    }

    /**
     * Save Cama
     *
     * @param {boolean} formValid Form validity check
     * @param Cama item Cama to save
     */
    save(formValid: boolean): void {
        this.formValid = formValid;
        if (formValid) {
            if (this.isNew) {
                // Create
                this.camaService.create(this.item);
                this.isNew = false;
            } else {
                // Update
                this.camaService.update(this.itemDoc, this.item);
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
