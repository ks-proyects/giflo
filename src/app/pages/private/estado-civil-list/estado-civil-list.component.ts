import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';

// Import Services
import { EstadoCivilService } from '../../../services/estado-civil.service';
// Import Models
import { EstadoCivil } from '../../../domain/giflo_db/estado-civil';

// START - USED SERVICES
/**
* EstadoCivilService.delete
*	@description CRUD ACTION delete
*	@param ObjectId id Id
*
* EstadoCivilService.list
*	@description CRUD ACTION list
*
*/
// END - USED SERVICES

/**
 * This component shows a list of EstadoCivil
 * @class EstadoCivilListComponent
 */
@Component({
    selector: 'app-estado-civil-list',
    templateUrl: './estado-civil-list.component.html',
    styleUrls: ['./estado-civil-list.component.css']
})
export class EstadoCivilListComponent implements OnInit {
    list: Observable<any[]>;
    search: any = {};
    idSelected: string;
    constructor(
        private estadocivilService: EstadoCivilService,
    ) { }

    /**
     * Init
     */
    ngOnInit(): void {
        this.list = this.estadocivilService.list();
    }

    /**
     * Select EstadoCivil to remove
     *
     * @param {string} id Id of the EstadoCivil to remove
     */
    selectId(id: string) {
        this.idSelected = id;
    }

    /**
     * Remove selected EstadoCivil
     */
    deleteItem() {
        this.estadocivilService.remove(this.idSelected);
    }

}
