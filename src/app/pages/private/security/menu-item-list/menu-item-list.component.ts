import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

// Import Services
import { MenuItemService } from '../../../../services/menu-item.service';
// Import Models
import { MenuItem } from '../../../../domain/giflo_db/menu-item';
import { MatTableDataSource } from '@angular/material';
import { BreakpointObserver } from '@angular/cdk/layout';
import { DialogService } from 'src/app/util/dialog.service';
import { DialogData } from '../../../common/mat-dialog/mat-dialog.component';
import { ListComponentService } from 'src/app/services/generic/list-component.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { leftJoinDocument } from 'src/app/services/generic/leftJoin.service';

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
export class MenuItemListComponent extends ListComponentService implements OnInit {
    constructor(
        private menuitemService: MenuItemService,
        private breakpointObserver: BreakpointObserver,
        private disSer: DialogService,
        private afs: AngularFirestore
    ) {
        super();
        this.dataSource = new MatTableDataSource([]);
        breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
            this.displayedColumns = result.matches ?
                ['acciones', 'rol', 'pagina'] :
                ['acciones', 'rol', 'pagina', 'estado'];
        });
    }

    ngOnInit(): void {
        this.menuitemService.list().pipe(
            leftJoinDocument(this.afs, 'pagina', 'pagina'),
            leftJoinDocument(this.afs, 'rol', 'rol')
        ).subscribe(arrayData => {
            this.dataSource = new MatTableDataSource((arrayData as MenuItem[]));
        }
        );
    }
    openConfirm(action, id) {
        const dialogData: DialogData = { id: id, action: action, msg: 'Desea eliminar el regestro' };
        const dialogRef = this.disSer.openDialog(dialogData);
        dialogRef.afterClosed().subscribe(result => {
            if (result.event === 'Delete') {
                this.menuitemService.remove(result.data.id);
            }
        });
    }
}
