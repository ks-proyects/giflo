import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';

// Import Services
import { EstadoService } from '../../services/estado.service';
// Import Models
import { Estado } from '../../domain/giflo_db/estado';

// START - USED SERVICES
/**
* EstadoService.delete
*	@description CRUD ACTION delete
*	@param ObjectId id Id
*
* EstadoService.list
*	@description CRUD ACTION list
*
*/
// END - USED SERVICES

/**
 * This component shows a list of Estado
 * @class EstadoListComponent
 */
@Component({
    selector: 'app-estado-list',
    templateUrl: './estado-list.component.html',
    styleUrls: ['./estado-list.component.css']
})
export class EstadoListComponent implements OnInit {
    list: Observable<any[]>;
    search: any = {};
    idSelected: string;
    constructor(
        private estadoService: EstadoService,
    ) { }

    /**
     * Init
     */
    ngOnInit(): void {
        this.list = this.estadoService.list();
    }

    /**
     * Select Estado to remove
     *
     * @param {string} id Id of the Estado to remove
     */
    selectId(id: string) {
        this.idSelected = id;
    }

    /**
     * Remove selected Estado
     */
    deleteItem() {
        this.estadoService.remove(this.idSelected);
    }

}
