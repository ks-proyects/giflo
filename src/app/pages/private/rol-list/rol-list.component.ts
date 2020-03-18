import { Component, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';

// Import Services
import { RolService } from '../../../services/rol.service';
// Import Models
import { Rol } from '../../../domain/giflo_db/rol';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { BreakpointObserver } from '@angular/cdk/layout';
import { DialogService } from 'src/app/shared/dialog.service';
import { DialogData } from '../../common/mat-dialog/mat-dialog.component';

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

    displayedColumns = ['acciones', 'descripcion', 'activo'];
    dataSource: MatTableDataSource<Rol>;
    @ViewChild(MatPaginator, {}) paginator: MatPaginator;
    @ViewChild(MatSort, {}) sort: MatSort;
    constructor(
        private rolService: RolService,
        private breakpointObserver: BreakpointObserver,
        private disSer: DialogService
    ) {
        this.dataSource = new MatTableDataSource([]);
        breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
            this.displayedColumns = result.matches ?
                ['acciones', 'descripcion', 'activo'] :
                ['acciones', 'descripcion', 'activo'];
        });
    }

    ngOnInit(): void {
        this.rolService.list().subscribe(arrayData => {
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
                this.rolService.remove(result.data.id);
            }
        });
    }
}
