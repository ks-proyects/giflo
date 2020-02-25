import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';

// Import Services
import { PaginaService } from '../../services/pagina.service';
// Import Models
import { Pagina } from '../../domain/giflo_db/pagina';

// START - USED SERVICES
/**
* PaginaService.delete
*	@description CRUD ACTION delete
*	@param ObjectId id Id
*
* PaginaService.list
*	@description CRUD ACTION list
*
*/
// END - USED SERVICES

/**
 * This component shows a list of Pagina
 * @class PaginaListComponent
 */
@Component({
    selector: 'app-pagina-list',
    templateUrl: './pagina-list.component.html',
    styleUrls: ['./pagina-list.component.css']
})
export class PaginaListComponent implements OnInit {
    list: Observable<any[]>;
    search: any = {};
    idSelected: string;
    constructor(
        private paginaService: PaginaService,
    ) { }

    /**
     * Init
     */
    ngOnInit(): void {
        this.list = this.paginaService.list();
    }

    /**
     * Select Pagina to remove
     *
     * @param {string} id Id of the Pagina to remove
     */
    selectId(id: string) {
        this.idSelected = id;
    }

    /**
     * Remove selected Pagina
     */
    deleteItem() {
        this.paginaService.remove(this.idSelected);
    }

}
