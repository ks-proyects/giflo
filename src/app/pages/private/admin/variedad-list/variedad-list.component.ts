import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';

// Import Services
import { VariedadService } from '../../../../services/variedad.service';
// Import Models
import { Variedad } from '../../../../domain/giflo_db/variedad';

// START - USED SERVICES
/**
* VariedadService.delete
*	@description CRUD ACTION delete
*	@param ObjectId id Id
*
* VariedadService.list
*	@description CRUD ACTION list
*
*/
// END - USED SERVICES

/**
 * This component shows a list of Variedad
 * @class VariedadListComponent
 */
@Component({
    selector: 'app-variedad-list',
    templateUrl: './variedad-list.component.html',
    styleUrls: ['./variedad-list.component.css']
})
export class VariedadListComponent implements OnInit {
    list: Observable<any[]>;
    search: any = {};
    idSelected: string;
    constructor(
        private variedadService: VariedadService,
    ) { }

    /**
     * Init
     */
    ngOnInit(): void {
        this.list = this.variedadService.list();
    }

    /**
     * Select Variedad to remove
     *
     * @param {string} id Id of the Variedad to remove
     */
    selectId(id: string) {
        this.idSelected = id;
    }

    /**
     * Remove selected Variedad
     */
    deleteItem() {
        this.variedadService.remove(this.idSelected);
    }

}
