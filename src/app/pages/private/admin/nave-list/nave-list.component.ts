import { Component, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';

// Import Services
import { NaveService } from '../../../../services/nave.service';
// Import Models
import { MatTableDataSource} from '@angular/material';
import { BreakpointObserver } from '@angular/cdk/layout';
import { DialogService } from 'src/app/shared/dialog.service';
import { DialogData } from 'src/app/pages/common/mat-dialog/mat-dialog.component';
import { ListComponentService } from 'src/app/services/generic/list-component.service';

// START - USED SERVICES
/**
* NaveService.delete
*	@description CRUD ACTION delete
*	@param ObjectId id Id
*
* NaveService.list
*	@description CRUD ACTION list
*
*/
// END - USED SERVICES

/**
 * This component shows a list of Nave
 * @class NaveListComponent
 */
@Component({
    selector: 'app-nave-list',
    templateUrl: './nave-list.component.html',
    styleUrls: ['./nave-list.component.css']
})
export class NaveListComponent extends ListComponentService implements OnInit {
    constructor(
        private naveService: NaveService,
        private breakpointObserver: BreakpointObserver,
        private disSer: DialogService
    ) {
        super();
        this.dataSource = new MatTableDataSource([]);
        breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
            this.displayedColumns = result.matches ?
                ['id', 'nombre'] :
                ['id', 'nombre', 'estado'];
        });
    }
    ngOnInit(): void {
        this.naveService.list().subscribe(arrayData => {
            this.dataSource = new MatTableDataSource(arrayData);
        }
        );
    }
    openConfirm(action, id) {
        const dialogData: DialogData = { id: id, action: action, msg: 'Desea eliminar el regestro' };
        const dialogRef = this.disSer.openDialog(dialogData);
        dialogRef.afterClosed().subscribe(result => {
            if (result.event == 'Delete') {
                this.naveService.remove(result.data.id);
            }
        });
    }

}
