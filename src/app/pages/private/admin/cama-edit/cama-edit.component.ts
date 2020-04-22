// Import Libraries
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

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
import { Subscription } from 'rxjs';
import { leftJoinDocument } from 'src/app/services/generic/leftJoin.service';
import { Bloque } from 'src/app/domain/giflo_db/bloque';

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
export class CamaEditComponent implements OnInit, OnDestroy {
    item: any = {};
    itemDoc: AngularFirestoreDocument<Cama>;
    isNew: Boolean = true;
    formValid: Boolean;

    listEstado: Estado[];
    listNave: Nave[];
    listSupervisor: Empleado[];
    listTrabajador: Empleado[];
    listVariedad: Variedad[];

    empleadoServiceSubscription: Subscription;
    naveServiceSubscription: Subscription;
    variedadServiceSubscription: Subscription;
    routeSubscription: Subscription;
    constructor(
        private camaService: CamaService,
        private empleadoService: EmpleadoService,
        private naveService: NaveService,
        private variedadService: VariedadService,
        private estadoService: EstadoService,
        private route: ActivatedRoute,
        private location: Location,
        private afs: AngularFirestore) {
        // Init list
    }

    ngOnDestroy() {
        this.empleadoServiceSubscription.unsubscribe();
        this.naveServiceSubscription.unsubscribe();
        this.variedadServiceSubscription.unsubscribe();
        this.routeSubscription.unsubscribe();
    }
    /**
     * Init
     */
    ngOnInit() {
        this.routeSubscription = this.route.params.subscribe(param => {
            const id: string = param['id'];
            if (id !== 'new') {
                this.isNew = false;
                this.itemDoc = this.camaService.get(id);
                this.itemDoc.valueChanges().subscribe(item => {
                    this.item = item;
                });

            }
            // Get relations
            this.estadoService.list().subscribe(list => this.listEstado = list);
            this.naveServiceSubscription = this.naveService.list().pipe(
                leftJoinDocument(this.afs, 'bloque', 'bloque')
            ).subscribe(list => this.listNave = list as Nave[]);
            this.empleadoServiceSubscription = this.empleadoService.listActive().
                pipe(leftJoinDocument(this.afs, 'user', 'user')).subscribe(list => {
                    this.listSupervisor = list as Empleado[];
                    this.listTrabajador = list as Empleado[];
                });
            this.variedadServiceSubscription = this.variedadService.list().subscribe(list => this.listVariedad = list);
        });
    }


    /**
     * Check if an Variedad is in  variedad
     *
     * @param {string} id Id of Variedad to search
     * @returns {boolean} True if it is found
     */
    containVariedad(id: Variedad): boolean {
        if (!this.item.variedad) return false;
        return this.item.variedad.indexOf(id) !== -1;
    }

    /**
     * Add Variedad from Cama
     *
     * @param {string} id Id of Variedad to add in this.item.variedad array
     */
    addVariedad(id: Variedad) {
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
            const listFind = this.listNave.filter(nave => nave.id == this.item.nave);
            const bloque = listFind.length > 0 ? (listFind[0].bloque as Bloque).id : '';
            this.item.bloque = bloque;
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
