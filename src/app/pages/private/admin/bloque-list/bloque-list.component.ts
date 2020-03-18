import { Component, ViewChild, Inject } from '@angular/core';
import { OnInit } from '@angular/core';

// Import Services
import { BloqueService } from '../../../../services/bloque.service';
// Import Models
import { Bloque } from '../../../../domain/giflo_db/bloque';
import { MatTableDataSource, MatSort, MatPaginator, MAT_DIALOG_DATA } from '@angular/material';
import { BreakpointObserver } from '@angular/cdk/layout';
import { DialogService } from 'src/app/shared/dialog.service';
import { DialogData } from '../../../common/mat-dialog/mat-dialog.component';

// START - USED SERVICES
/**
* BloqueService.delete
*	@description CRUD ACTION delete
*	@param ObjectId id Id
*
* BloqueService.list
*	@description CRUD ACTION list
*
*/
// END - USED SERVICES

/**
 * This component shows a list of Bloque
 * @class BloqueListComponent
 */
@Component({
  selector: 'app-bloque-list',
  templateUrl: './bloque-list.component.html',
  styleUrls: ['./bloque-list.component.css']
})
export class BloqueListComponent implements OnInit {
  displayedColumns = ['id', 'nombre', 'estado'];
  dataSource: MatTableDataSource<Bloque>;

  @ViewChild(MatPaginator, {}) paginator: MatPaginator;
  @ViewChild(MatSort, {}) sort: MatSort;
  constructor(
    private bloqueService: BloqueService,
    private breakpointObserver: BreakpointObserver,
    private disSer: DialogService
  ) {
    this.dataSource = new MatTableDataSource([]);
    breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
      this.displayedColumns = result.matches ?
        ['id', 'nombre'] :
        ['id', 'nombre', 'estado'];
    });
  }
  /**
   * Init
   */
  ngOnInit(): void {
    this.bloqueService.list().subscribe(arrayData => {
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
        this.bloqueService.remove(result.data.id);
      }
    });
  }
}

