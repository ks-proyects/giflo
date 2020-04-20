import { Component, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';

// Import Services
import { PaginaService } from '../../../../services/pagina.service';
// Import Models
import { Pagina } from '../../../../domain/giflo_db/pagina';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { BreakpointObserver } from '@angular/cdk/layout';
import { DialogService } from 'src/app/util/dialog.service';
import { DialogData } from '../../../common/mat-dialog/mat-dialog.component';
import { ListComponentService } from 'src/app/services/generic/list-component.service';

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
export class PaginaListComponent extends ListComponentService implements OnInit {

    constructor(
        private paginaService: PaginaService,
        private breakpointObserver: BreakpointObserver,
        private disSer: DialogService
    ) {
        super();
        this.dataSource = new MatTableDataSource([]);
        breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
            this.displayedColumns = result.matches ?
                ['accion', 'component', 'path'] :
                ['accion', 'component', 'loadChildren', 'path'];
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
