import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';

// Import Services
import { MenuItemService } from '../../services/menu-item.service';
// Import Models
import { MenuItem } from '../../domain/giflo_db/menu-item';

// START - USED SERVICES
/**
* MenuItemService.delete
*	@description CRUD ACTION delete
*	@param ObjectId id Id
*
* MenuItemService.list
*	@description CRUD ACTION list
*
*/
// END - USED SERVICES

/**
 * This component shows a list of MenuItem
 * @class MenuItemListComponent
 */
@Component({
    selector: 'app-menu-item-list',
    templateUrl: './menu-item-list.component.html',
    styleUrls: ['./menu-item-list.component.css']
})
export class MenuItemListComponent implements OnInit {
    list: Observable<any[]>;
    search: any = {};
    idSelected: string;
    constructor(
        private menuitemService: MenuItemService,
    ) { }

    /**
     * Init
     */
    ngOnInit(): void {
        this.list = this.menuitemService.list();
    }

    /**
     * Select MenuItem to remove
     *
     * @param {string} id Id of the MenuItem to remove
     */
    selectId(id: string) {
        this.idSelected = id;
    }

    /**
     * Remove selected MenuItem
     */
    deleteItem() {
        this.menuitemService.remove(this.idSelected);
    }

}
