// Import Libraries
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestoreDocument } from '@angular/fire/firestore';


// Import Services
import { VariedadService } from '../../../../services/variedad.service';

import { Variedad } from '../../../../domain/giflo_db/variedad';
import { ColorRosa } from 'src/app/domain/dto/color-rosa';

// START - USED SERVICES
/**
* VariedadService.create
*	@description CRUD ACTION create
*
* VariedadService.get
*	@description CRUD ACTION get
*	@param ObjectId id Id 
*
* VariedadService.update
*	@description CRUD ACTION update
*	@param ObjectId id Id
*
*/
// END - USED SERVICES

/**
 * This component allows to edit a  Variedad
 */
@Component({
    selector: 'app-variedad-edit',
    templateUrl: 'variedad-edit.component.html',
    styleUrls: ['variedad-edit.component.css']
})
export class VariedadEditComponent implements OnInit {
    item: any = {};
    itemDoc: AngularFirestoreDocument<Variedad>;
    isNew: Boolean = true;
    formValid: Boolean;
    listColor: ColorRosa[] = [
        { nombre: 'Rojo', codigo: '#A70A1C', codigoLetra: '#FFF' },
        { nombre: 'Amarillo', codigo: '#E9E346', codigoLetra: '#000' },
        { nombre: 'Verde', codigo: '#0E6730', codigoLetra: '#FFF' },
        { nombre: 'Morado', codigo: '#801461', codigoLetra: '#FFF' },
        { nombre: 'Blanco', codigo: '#F3F3ED', codigoLetra: '#000' }
    ];

    constructor(
        private variedadService: VariedadService,
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
                this.itemDoc = this.variedadService.get(id);
                this.itemDoc.valueChanges().subscribe(item => {
                    this.item = item;
                });

            }
            // Get relations
        });
    }



    /**
     * Save Variedad
     *
     * @param {boolean} formValid Form validity check
     * @param Variedad item Variedad to save
     */
    save(formValid: boolean): void {
        this.formValid = formValid;
        if (formValid) {
            if (this.isNew) {
                // Create
                this.variedadService.create(this.item);
                this.isNew = false;
            } else {
                // Update
                this.variedadService.update(this.itemDoc, this.item);
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
