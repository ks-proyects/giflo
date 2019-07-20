import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';

// Import Services
import { EmpleadoService } from '../../services/empleado.service';
// Import Models
import { Empleado } from '../../domain/giflo_db/empleado';

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
export class EmpleadoListComponent implements OnInit {
    list: Observable<any[]>;
    search: any = {};
    idSelected: string;
    constructor(
        private empleadoService: EmpleadoService,
    ) { }

    /**
     * Init
     */
    ngOnInit(): void {
        this.list = this.empleadoService.list();
    }

    /**
     * Select Empleado to remove
     *
     * @param {string} id Id of the Empleado to remove
     */
    selectId(id: string) {
        this.idSelected = id;
    }

    /**
     * Remove selected Empleado
     */
    deleteItem() {
        this.empleadoService.remove(this.idSelected);
    }

}
