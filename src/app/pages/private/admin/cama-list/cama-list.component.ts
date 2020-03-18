import { Component, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';

// Import Services
import { CamaService } from '../../../../services/cama.service';
// Import Models
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { BreakpointObserver } from '@angular/cdk/layout';
import { DialogService } from 'src/app/shared/dialog.service';
import { DialogData } from 'src/app/pages/common/mat-dialog/mat-dialog.component';
import { ListComponentService } from 'src/app/services/generic/list-component.service';

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
export class CamaListComponent extends ListComponentService implements OnInit {
    constructor(
        private camaService: CamaService,
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
        this.camaService.list().subscribe(arrayData => {
            this.dataSource = new MatTableDataSource(arrayData);
        }
        );
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
