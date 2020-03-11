import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';

// Import Services
import { RolService } from '../../../services/rol.service';
// Import Models
import { Rol } from '../../../domain/giflo_db/rol';

// START - USED SERVICES
/**
* RolService.delete
*	@description CRUD ACTION delete
*	@param ObjectId id Id
*
* RolService.list
*	@description CRUD ACTION list
*
*/
// END - USED SERVICES

/**
 * This component shows a list of Rol
 * @class RolListComponent
 */
@Component({
    selector: 'app-rol-list',
    templateUrl: './rol-list.component.html',
    styleUrls: ['./rol-list.component.css']
})
export class RolListComponent implements OnInit {
    list: Observable<any[]>;
    search: any = {};
    idSelected: string;
    constructor(
        private rolService: RolService,
    ) { }

    /**
     * Init
     */
    ngOnInit(): void {
        this.list = this.rolService.list();
    }

    /**
     * Select Rol to remove
     *
     * @param {string} id Id of the Rol to remove
     */
    selectId(id: string) {
        this.idSelected = id;
    }

    /**
     * Remove selected Rol
     */
    deleteItem() {
        this.rolService.remove(this.idSelected);
    }

}
