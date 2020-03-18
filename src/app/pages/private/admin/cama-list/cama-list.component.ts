import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';

// Import Services
import { CamaService } from '../../../../services/cama.service';
// Import Models
import { Cama } from '../../../../domain/giflo_db/cama';

// START - USED SERVICES
/**
* CamaService.delete
*	@description CRUD ACTION delete
*	@param ObjectId id Id
*
* CamaService.list
*	@description CRUD ACTION list
*
*/
// END - USED SERVICES

/**
 * This component shows a list of Cama
 * @class CamaListComponent
 */
@Component({
    selector: 'app-cama-list',
    templateUrl: './cama-list.component.html',
    styleUrls: ['./cama-list.component.css']
})
export class CamaListComponent implements OnInit {
    list: Observable<any[]>;
    search: any = {};
    idSelected: string;
    constructor(
        private camaService: CamaService,
    ) { }

    /**
     * Init
     */
    ngOnInit(): void {
        this.list = this.camaService.list();
    }

    /**
     * Select Cama to remove
     *
     * @param {string} id Id of the Cama to remove
     */
    selectId(id: string) {
        this.idSelected = id;
    }

    /**
     * Remove selected Cama
     */
    deleteItem() {
        this.camaService.remove(this.idSelected);
    }

}
