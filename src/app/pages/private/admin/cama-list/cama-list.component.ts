import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

// Import Services
import { CamaService } from '../../../../services/cama.service';
// Import Models
import { MatTableDataSource } from '@angular/material';
import { BreakpointObserver } from '@angular/cdk/layout';
import { DialogService } from 'src/app/util/dialog.service';
import { DialogData } from 'src/app/pages/common/mat-dialog/mat-dialog.component';
import { ListComponentService } from 'src/app/services/generic/list-component.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { leftJoinDocument } from 'src/app/services/generic/leftJoin.service';
import { Cama } from 'src/app/domain/giflo_db/cama';

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
        private disSer: DialogService,
        private afs: AngularFirestore
    ) {
        super();
        this.dataSource = new MatTableDataSource([]);
        breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
            this.displayedColumns = result.matches ?
                ['id', 'nombre', 'responsable'] :
                ['id', 'nombre', 'responsable', 'estado'];
        });
    }
    ngOnInit(): void {
        this.camaService.list().pipe(
            leftJoinDocument(this.afs, 'estado', 'estado'), leftJoinDocument(this.afs, 'trabajador', 'empleado')).subscribe(arrayData => {
                this.dataSource = new MatTableDataSource(arrayData as Cama[]);
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
