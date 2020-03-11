// Import Libraries
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

// Import Services
import { EmpleadoService } from '../../../services/empleado.service';
import { EmpresaService } from '../../../services/empresa.service';
import { EstadoService } from '../../../services/estado.service';
import { DireccionService } from '../../../services/direccion.service';
import { ContactoService } from '../../../services/contacto.service';
import { EstadoCivilService } from '../../../services/estado-civil.service';
import { RolService } from '../../../services/rol.service';

import { Empleado } from '../../../domain/giflo_db/empleado';
import { Contacto } from '../../../domain/giflo_db/contacto';
import { Direccion } from '../../../domain/giflo_db/direccion';
import { Empresa } from '../../../domain/giflo_db/empresa';
import { Estado } from '../../../domain/giflo_db/estado';
import { EstadoCivil } from '../../../domain/giflo_db/estado-civil';
import { Rol } from '../../../domain/giflo_db/rol';

// START - USED SERVICES
/**
* EmpresaService.list
*	@description CRUD ACTION list
*
* EstadoService.list
*	@description CRUD ACTION list
*
* EmpresaService.list
*	@description CRUD ACTION list
*
* DireccionService.list
*	@description CRUD ACTION list
*
* ContactoService.list
*	@description CRUD ACTION list
*
* EstadoCivilService.list
*	@description CRUD ACTION list
*
* RolService.list
*	@description CRUD ACTION list
*
*/
// END - USED SERVICES

/**
 * This component allows to edit a  Empleado
 */
@Component({
    selector: 'app-empleado-edit',
    templateUrl: 'empleado-edit.component.html',
    styleUrls: ['empleado-edit.component.css']
})
export class EmpleadoEditComponent implements OnInit {
    item: any = {};
    itemDoc: AngularFirestoreDocument<Empleado>;
    isNew: Boolean = true;
    formValid: Boolean;

    listContacto: Contacto[];
    listDireccion: Direccion[];
    listEmpresa: Empresa[];
    listEstado: Estado[];
    listEstadoCivil: EstadoCivil[];
    listRol: Rol[];
    listUser: Empresa[];


    constructor(
        private empleadoService: EmpleadoService,
        private empresaService: EmpresaService,
        private estadoService: EstadoService,
        private direccionService: DireccionService,
        private contactoService: ContactoService,
        private estadocivilService: EstadoCivilService,
        private rolService: RolService,
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
                this.itemDoc = this.empleadoService.get(id);
                this.itemDoc.valueChanges().subscribe(item => this.item = item);

            }
            // Get relations
            this.contactoService.list().subscribe(list => this.listContacto = list);
            this.direccionService.list().subscribe(list => this.listDireccion = list);
            this.empresaService.list().subscribe(list => this.listEmpresa = list);
            this.estadoService.list().subscribe(list => this.listEstado = list);
            this.estadocivilService.list().subscribe(list => this.listEstadoCivil = list);
            this.rolService.list().subscribe(list => this.listRol = list);
            this.empresaService.list().subscribe(list => this.listUser = list);
        });
    }



    /**
     * Save Empleado
     *
     * @param {boolean} formValid Form validity check
     * @param Empleado item Empleado to save
     */
    save(formValid: boolean): void {
        this.formValid = formValid;
        if (formValid) {
            if (this.isNew) {
                // Create
                this.empleadoService.create(this.item);
                this.isNew = false;
            } else {
                // Update
                this.empleadoService.update(this.itemDoc, this.item);
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
