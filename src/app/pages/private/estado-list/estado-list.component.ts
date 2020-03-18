import { Component, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';

// Import Services
import { EstadoService } from '../../../services/estado.service';
// Import Models
import { Estado } from '../../../domain/giflo_db/estado';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { BreakpointObserver } from '@angular/cdk/layout';
import { DialogService } from 'src/app/shared/dialog.service';
import { DialogData } from '../../common/mat-dialog/mat-dialog.component';

// START - USED SERVICES
/**
* EstadoService.delete
*	@description CRUD ACTION delete
*	@param ObjectId id Id
*
* EstadoService.list
*	@description CRUD ACTION list
*
*/
// END - USED SERVICES

/**
 * This component shows a list of Estado
 * @class EstadoListComponent
 */
@Component({
  selector: 'app-estado-list',
  templateUrl: './estado-list.component.html',
  styleUrls: ['./estado-list.component.css']
})
export class EstadoListComponent implements OnInit {

  displayedColumns = ['acciones', 'descripcion'];
  dataSource: MatTableDataSource<Estado>;

  @ViewChild(MatPaginator, {}) paginator: MatPaginator;
  @ViewChild(MatSort, {}) sort: MatSort;
  constructor(
    private estadoService: EstadoService,
    private breakpointObserver: BreakpointObserver,
    private disSer: DialogService
  ) {

    this.dataSource = new MatTableDataSource([]);
    breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
      this.displayedColumns = result.matches ?
        ['acciones', 'descripcion'] :
        ['acciones', 'descripcion'];
    });
  }

  /**
   * Init
   */
  ngOnInit(): void {
    this.estadoService.list().subscribe(arrayData => {
      this.dataSource = new MatTableDataSource(arrayData);
    }
    );
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  openConfirm(action, id) {
    const dialogData: DialogData = { id: id, action: action, msg: 'Desea eliminar el regestro' };
    const dialogRef = this.disSer.openDialog(dialogData);
    dialogRef.afterClosed().subscribe(result => {
      if (result.event == 'Delete') {
        this.estadoService.remove(result.data.id);
      }
    });
  }

}
