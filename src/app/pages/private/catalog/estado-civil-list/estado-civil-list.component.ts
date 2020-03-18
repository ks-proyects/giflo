import { Component, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';

// Import Services
import { EstadoCivilService } from '../../../../services/estado-civil.service';
// Import Models
import { EstadoCivil } from '../../../../domain/giflo_db/estado-civil';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { BreakpointObserver } from '@angular/cdk/layout';
import { DialogService } from 'src/app/shared/dialog.service';
import { DialogData } from '../../../common/mat-dialog/mat-dialog.component';

// START - USED SERVICES
/**
* EstadoCivilService.delete
*	@description CRUD ACTION delete
*	@param ObjectId id Id
*
* EstadoCivilService.list
*	@description CRUD ACTION list
*
*/
// END - USED SERVICES

/**
 * This component shows a list of EstadoCivil
 * @class EstadoCivilListComponent
 */
@Component({
    selector: 'app-estado-civil-list',
    templateUrl: './estado-civil-list.component.html',
    styleUrls: ['./estado-civil-list.component.css']
})
export class EstadoCivilListComponent implements OnInit {

    displayedColumns = ['acciones', 'descripcion'];
    dataSource: MatTableDataSource<EstadoCivil>;
    @ViewChild(MatPaginator, {}) paginator: MatPaginator;
    @ViewChild(MatSort, {}) sort: MatSort;
    constructor(
        private estadocivilService: EstadoCivilService,
        private breakpointObserver: BreakpointObserver,
        private disSer: DialogService
    ) {
        this.dataSource = new MatTableDataSource([]);
        breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
            this.displayedColumns = result.matches ?
                ['acciones', 'descripcion'] :
                ['acciones', 'descripcion'];
        });
    }
    ngOnInit(): void {
        this.estadocivilService.list().subscribe(arrayData => {
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
                this.estadocivilService.remove(result.data.id);
            }
        });
    }

}