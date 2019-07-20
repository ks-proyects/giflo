import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';

// Import Services
import { BloqueService } from '../../services/bloque.service';
// Import Models
import { Bloque } from '../../domain/giflo_db/bloque';

// START - USED SERVICES
/**
* BloqueService.delete
*	@description CRUD ACTION delete
*	@param ObjectId id Id
*
* BloqueService.list
*	@description CRUD ACTION list
*
*/
// END - USED SERVICES

/**
 * This component shows a list of Bloque
 * @class BloqueListComponent
 */
@Component({
    selector: 'app-bloque-list',
    templateUrl: './bloque-list.component.html',
    styleUrls: ['./bloque-list.component.css']
})
export class BloqueListComponent implements OnInit {
    list: Observable<any[]>;
    search: any = {};
    idSelected: string;
    constructor(
        private bloqueService: BloqueService,
    ) { }

    /**
     * Init
     */
    ngOnInit(): void {
        this.list = this.bloqueService.list();
    }

    /**
     * Select Bloque to remove
     *
     * @param {string} id Id of the Bloque to remove
     */
    selectId(id: string) {
        this.idSelected = id;
    }

    /**
     * Remove selected Bloque
     */
    deleteItem() {
        this.bloqueService.remove(this.idSelected);
    }

}
