import { Component, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';

// Import Services
import { PaginaService } from '../../../../services/pagina.service';
// Import Models
import { Pagina } from '../../../../domain/giflo_db/pagina';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { BreakpointObserver } from '@angular/cdk/layout';
import { DialogService } from 'src/app/shared/dialog.service';
import { DialogData } from '../../../common/mat-dialog/mat-dialog.component';

// START - USED SERVICES
/**
* PaginaService.delete
*	@description CRUD ACTION delete
*	@param ObjectId id Id
*
* PaginaService.list
*	@description CRUD ACTION list
*
*/
// END - USED SERVICES

/**
 * This component shows a list of Pagina
 * @class PaginaListComponent
 */
@Component({
    selector: 'app-pagina-list',
    templateUrl: './pagina-list.component.html',
    styleUrls: ['./pagina-list.component.css']
})
export class PaginaListComponent implements OnInit {
    displayedColumns = ['accion', 'component', 'loadChildren','path'];
    dataSource: MatTableDataSource<Pagina>;

    @ViewChild(MatPaginator, {}) paginator: MatPaginator;
    @ViewChild(MatSort, {}) sort: MatSort;
    constructor(
        private paginaService: PaginaService,
        private breakpointObserver: BreakpointObserver,
        private disSer: DialogService
    ) { 
        this.dataSource = new MatTableDataSource([]);
        breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
            this.displayedColumns = result.matches ?
                ['accion', 'component','path'] :
                ['accion', 'component', 'loadChildren','path'];
        });
    }
    /**
     * Init
     */
    ngOnInit(): void {
        this.paginaService.list().subscribe(arrayData => {
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
                this.paginaService.remove(result.data.id);
            }
        });
    }

    

}
