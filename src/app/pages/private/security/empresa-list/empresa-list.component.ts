import { Component, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';

// Import Services
import { EmpresaService } from '../../../../services/empresa.service';
// Import Models
import { Empresa } from '../../../../domain/giflo_db/empresa';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { BreakpointObserver } from '@angular/cdk/layout';
import { DialogService } from 'src/app/shared/dialog.service';
import { DialogData } from '../../../common/mat-dialog/mat-dialog.component';
import { ListComponentService } from 'src/app/services/generic/list-component.service';

// START - USED SERVICES

// END - USED SERVICES

/**
 * This component shows a list of Empresa
 * @class EmpresaListComponent
 */
@Component({
    selector: 'app-empresa-list',
    templateUrl: './empresa-list.component.html',
    styleUrls: ['./empresa-list.component.css']
})
export class EmpresaListComponent extends ListComponentService implements OnInit {
    constructor(
        private empresaService: EmpresaService,
        private breakpointObserver: BreakpointObserver,
        private disSer: DialogService
    ) {
        super();
        this.dataSource = new MatTableDataSource([]);
        breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
            this.displayedColumns = result.matches ?
                ['accion', 'nombre'] :
                ['accion', 'ruc', 'nombre'];
        });
    }

    /**
     * Init
     */
    ngOnInit(): void {
        this.empresaService.list().subscribe(arrayData => {
            this.dataSource = new MatTableDataSource(arrayData);
        }
        );
    }
    openConfirm(action, id) {
        const dialogData: DialogData = { id: id, action: action, msg: 'Desea eliminar el regestro' };
        const dialogRef = this.disSer.openDialog(dialogData);
        dialogRef.afterClosed().subscribe(result => {
            if (result.event == 'Delete') {
                this.empresaService.remove(result.data.id);
            }
        });
    }
}
