import { Component, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';

// Import Services
import { MenuItemService } from '../../../../services/menu-item.service';
// Import Models
import { MenuItem } from '../../../../domain/giflo_db/menu-item';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { BreakpointObserver } from '@angular/cdk/layout';
import { DialogService } from 'src/app/shared/dialog.service';
import { DialogData } from '../../../common/mat-dialog/mat-dialog.component';

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
    displayedColumns = ['acciones', 'rol', 'pagina','estado'];
    dataSource: MatTableDataSource<MenuItem>;
    @ViewChild(MatPaginator, {}) paginator: MatPaginator;
    @ViewChild(MatSort, {}) sort: MatSort;
    constructor(
        private menuitemService: MenuItemService,
        private breakpointObserver: BreakpointObserver,
        private disSer: DialogService
    ) {
        this.dataSource = new MatTableDataSource([]);
        breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
            this.displayedColumns = result.matches ?
                ['acciones', 'rol', 'pagina'] :
                ['acciones', 'rol', 'pagina','estado'];
        });
    }

    ngOnInit(): void {
        this.menuitemService.list().subscribe(arrayData => {
            this.dataSource = new MatTableDataSource(arrayData);
        }
        );
    }
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }
    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }
    openConfirm(action, id) {
        const dialogData: DialogData = { id: id, action: action, msg: 'Desea eliminar el regestro' };
        const dialogRef = this.disSer.openDialog(dialogData);
        dialogRef.afterClosed().subscribe(result => {
            if (result.event == 'Delete') {
                this.menuitemService.remove(result.data.id);
            }
        });
    }

}
