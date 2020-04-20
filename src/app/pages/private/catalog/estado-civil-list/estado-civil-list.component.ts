import { Component, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';

// Import Services
import { EstadoCivilService } from '../../../../services/estado-civil.service';
// Import Models
import { EstadoCivil } from '../../../../domain/giflo_db/estado-civil';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { BreakpointObserver } from '@angular/cdk/layout';
import { DialogService } from 'src/app/util/dialog.service';
import { DialogData } from '../../../common/mat-dialog/mat-dialog.component';
import { ListComponentService } from 'src/app/services/generic/list-component.service';

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
export class EstadoCivilListComponent extends ListComponentService implements OnInit {
    constructor(
        private estadocivilService: EstadoCivilService,
        private breakpointObserver: BreakpointObserver,
        private disSer: DialogService
    ) {
        super();
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
