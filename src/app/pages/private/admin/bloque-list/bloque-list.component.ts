import { Component, ViewChild, Inject } from '@angular/core';
import { OnInit } from '@angular/core';

// Import Services
import { BloqueService } from '../../../../services/bloque.service';
// Import Models
import { Bloque } from '../../../../domain/giflo_db/bloque';
import { MatTableDataSource, MatSort, MatPaginator, MAT_DIALOG_DATA } from '@angular/material';
import { BreakpointObserver } from '@angular/cdk/layout';
import { DialogService } from 'src/app/util/dialog.service';
import { DialogData } from '../../../common/mat-dialog/mat-dialog.component';
import { ListComponentService } from 'src/app/services/generic/list-component.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { leftJoinDocument } from 'src/app/services/generic/leftJoin.service';

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
export class BloqueListComponent extends ListComponentService implements OnInit {
  constructor(
    private bloqueService: BloqueService,
    private breakpointObserver: BreakpointObserver,
    private disSer: DialogService,
    private afs: AngularFirestore
  ) {
    super();
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
    this.bloqueService.list().pipe(
      leftJoinDocument(this.afs, 'estado', 'estado')).subscribe(arrayData => {
        this.dataSource = new MatTableDataSource(arrayData as Bloque[]);
      }
      );
  }
  openConfirm(actionInput, idInput) {
    const dialogData: DialogData = { id: idInput, action: actionInput, msg: 'Desea eliminar el regestro' };
    const dialogRef = this.disSer.openDialog(dialogData);
    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'Delete') {
        this.bloqueService.remove(result.data.id);
      }
    });
  }
}

