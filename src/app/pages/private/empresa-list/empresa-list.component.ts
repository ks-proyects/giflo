import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';

// Import Services
import { EmpresaService } from '../../../services/empresa.service';
// Import Models
import { Empresa } from '../../../domain/giflo_db/empresa';

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
export class EmpresaListComponent implements OnInit {
    list: Observable<any[]>;
    search: any = {};
    idSelected: string;
    constructor(
        private empresaService: EmpresaService,
    ) { }

    /**
     * Init
     */
    ngOnInit(): void {
        this.list = this.empresaService.list();
    }

    /**
     * Select Empresa to remove
     *
     * @param {string} id Id of the Empresa to remove
     */
    selectId(id: string) {
        this.idSelected = id;
    }

    /**
     * Remove selected Empresa
     */
    deleteItem() {
        this.empresaService.remove(this.idSelected);
    }

}
