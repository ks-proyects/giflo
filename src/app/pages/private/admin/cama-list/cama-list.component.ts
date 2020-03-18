import { Component, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';

// Import Services
import { CamaService } from '../../../../services/cama.service';
// Import Models
import { Cama } from '../../../../domain/giflo_db/cama';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { BreakpointObserver } from '@angular/cdk/layout';
import { DialogService } from 'src/app/shared/dialog.service';
import { DialogData } from 'src/app/pages/common/mat-dialog/mat-dialog.component';

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
    displayedColumns = ['id', 'nombre', 'estado'];
    dataSource: MatTableDataSource<Cama>;

    @ViewChild(MatPaginator, {}) paginator: MatPaginator;
    @ViewChild(MatSort, {}) sort: MatSort;
    constructor(
        private camaService: CamaService,
        private breakpointObserver: BreakpointObserver,
        private disSer: DialogService
    ) {
        this.dataSource = new MatTableDataSource([]);
        breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
            this.displayedColumns = result.matches ?
                ['id', 'nombre'] :
                ['id', 'nombre', 'estado'];
        });
    }
    ngOnInit(): void {
        this.camaService.list().subscribe(arrayData => {
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
                this.camaService.remove(result.data.id);
            }
        });
    }
}
