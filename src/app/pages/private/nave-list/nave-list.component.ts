import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';

// Import Services
import { NaveService } from '../../../services/nave.service';
// Import Models
import { Nave } from '../../../domain/giflo_db/nave';

// START - USED SERVICES
/**
* NaveService.delete
*	@description CRUD ACTION delete
*	@param ObjectId id Id
*
* NaveService.list
*	@description CRUD ACTION list
*
*/
// END - USED SERVICES

/**
 * This component shows a list of Nave
 * @class NaveListComponent
 */
@Component({
    selector: 'app-nave-list',
    templateUrl: './nave-list.component.html',
    styleUrls: ['./nave-list.component.css']
})
export class NaveListComponent implements OnInit {
    list: Observable<any[]>;
    search: any = {};
    idSelected: string;
    constructor(
        private naveService: NaveService,
    ) { }

    /**
     * Init
     */
    ngOnInit(): void {
        this.list = this.naveService.list();
    }

    /**
     * Select Nave to remove
     *
     * @param {string} id Id of the Nave to remove
     */
    selectId(id: string) {
        this.idSelected = id;
    }

    /**
     * Remove selected Nave
     */
    deleteItem() {
        this.naveService.remove(this.idSelected);
    }

}
