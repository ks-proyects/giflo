import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';

// Import Services
import { EmpleadoService } from '../../../../services/empleado.service';
// Import Models
import { Empleado } from '../../../../domain/giflo_db/empleado';
import { ListComponentService } from 'src/app/services/generic/list-component.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { DialogService } from 'src/app/shared/dialog.service';
import { MatTableDataSource } from '@angular/material';
import { DialogData } from 'src/app/pages/common/mat-dialog/mat-dialog.component';

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
        private disSer: DialogService
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
        this.empleadoService.list().subscribe(arrayData => {
            this.dataSource = new MatTableDataSource(arrayData);
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
