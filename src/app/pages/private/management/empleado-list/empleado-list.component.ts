import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

// Import Services
import { EmpleadoService } from '../../../../services/empleado.service';
// Import Models
import { Empleado } from '../../../../domain/giflo_db/empleado';
import { ListComponentService } from 'src/app/services/generic/list-component.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { DialogService } from 'src/app/util/dialog.service';
import { MatTableDataSource } from '@angular/material';
import { DialogData } from 'src/app/pages/common/mat-dialog/mat-dialog.component';
import { leftJoinDocument } from 'src/app/services/generic/leftJoin.service';
import { AngularFirestore } from '@angular/fire/firestore';

// START - USED SERVICES

// END - USED SERVICES

/**
 * This component shows a list of Empleado
 * @class EmpleadoListComponent
 */
@Component({
    selector: 'app-empleado-list',
    templateUrl: './empleado-list.component.html',
    styleUrls: ['./empleado-list.component.css']
})
export class EmpleadoListComponent extends ListComponentService implements OnInit {

    constructor(
        private empleadoService: EmpleadoService,
        private breakpointObserver: BreakpointObserver,
        private disSer: DialogService,
        private afs: AngularFirestore
    ) {
        super();
        this.dataSource = new MatTableDataSource([]);
        breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
            this.displayedColumns = result.matches ?
                ['id', 'cedula', 'nombres', 'apellidos'] :
                ['id', 'cedula', 'nombres', 'apellidos', 'estado'];
        });
    }
    ngOnInit(): void {
        this.empleadoService.list().pipe(
            leftJoinDocument(this.afs, 'estado', 'estado'),
            leftJoinDocument(this.afs, 'user', 'user'),
        ).subscribe(arrayData => {
            this.dataSource = new MatTableDataSource(arrayData as Empleado[]);
        }
        );
    }
    openConfirm(action, id) {
        const dialogData: DialogData = { id: id, action: action, msg: 'Desea eliminar el regestro' };
        const dialogRef = this.disSer.openDialog(dialogData);
        dialogRef.afterClosed().subscribe(result => {
            if (result.event == 'Delete') {
                this.empleadoService.remove(result.data.id);
            }
        });
    }
}
