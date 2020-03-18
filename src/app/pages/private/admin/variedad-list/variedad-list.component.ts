import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';

// Import Services
import { VariedadService } from '../../../../services/variedad.service';
// Import Models
import { Variedad } from '../../../../domain/giflo_db/variedad';
import { ListComponentService } from 'src/app/services/generic/list-component.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { DialogService } from 'src/app/shared/dialog.service';
import { MatTableDataSource } from '@angular/material';
import { DialogData } from 'src/app/pages/common/mat-dialog/mat-dialog.component';

// START - USED SERVICES
/**
* VariedadService.delete
*	@description CRUD ACTION delete
*	@param ObjectId id Id
*
* VariedadService.list
*	@description CRUD ACTION list
*
*/
// END - USED SERVICES

/**
 * This component shows a list of Variedad
 * @class VariedadListComponent
 */
@Component({
    selector: 'app-variedad-list',
    templateUrl: './variedad-list.component.html',
    styleUrls: ['./variedad-list.component.css']
})
export class VariedadListComponent extends ListComponentService implements OnInit {
    constructor(
        private variedadService: VariedadService,
        private breakpointObserver: BreakpointObserver,
        private disSer: DialogService
    ) {
        super();
        this.dataSource = new MatTableDataSource([]);
        breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
            this.displayedColumns = result.matches ?
                ['id', 'nombreComun','color'] :
                ['id', 'nombreComun','color'];
        });
    }
    ngOnInit(): void {
        this.variedadService.list().subscribe(arrayData => {
            this.dataSource = new MatTableDataSource(arrayData);
        }
        );
    }
    openConfirm(action, id) {
        const dialogData: DialogData = { id: id, action: action, msg: 'Desea eliminar el regestro' };
        const dialogRef = this.disSer.openDialog(dialogData);
        dialogRef.afterClosed().subscribe(result => {
            if (result.event == 'Delete') {
                this.variedadService.remove(result.data.id);
            }
        });
    }

}
