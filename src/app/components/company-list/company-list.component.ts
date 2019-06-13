import { Component, OnInit, ViewChild } from '@angular/core';
import { Sort, MatSort, MatTableDataSource, MatDialogConfig } from '@angular/material';
import { noop as _noop } from 'lodash';
import { CompanyService } from 'src/app/dao/company.service';
import { CompanyModel } from 'src/app/shared/model/company-model';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { MessageService } from 'src/app/shared/services/message.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.less']
})
export class CompanyListComponent implements OnInit {
  dataSource: MatTableDataSource<CompanyModel>;
  displayedColumns: string[] = ['name', 'email', 'status', 'phone' , 'actions'];

  limit: number = 1000;
  full: boolean = true;
  @ViewChild(MatSort) sort: MatSort;
  searchKey: string;
  constructor(
    private comDao: CompanyService,
    private dialogService: DialogService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.getData();
  }
  getData() {
    let data: CompanyModel[] = [];
    this.comDao.getEmployees().subscribe(dataRes => {
      data = dataRes.map(e => {
        return {
          $key: e.payload.doc.data().id,
          ...e.payload.doc.data()
        } as {};
      });
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.filterPredicate = ( data , filter) => {
        
        return this.displayedColumns.some(ele => {
          return data[ele] != undefined ? (ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1):false;
        });
      };
    });
  }
  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }


  handleScroll = (scrolled: boolean) => {
    scrolled ? this.getData() : _noop();
  }
  hasMore = () => {
    return !this.dataSource || this.dataSource.data.length < this.limit;
  }
  onCreate() {
    this.comDao.initializeFormGroup();
  }

  onEdit(row) {
    try {
      this.comDao.populateForm(row);
    } catch (error) {
      console.log(error);
    }
  }

  onActive(row) {
    try {
      const isActive = row.status === 'ACTIVO';
      this.comDao.populateForm(row);
      this.dialogService.openConfirmDialog('¿Está seguro de ' +
      (isActive ? 'INACTIVAR' : 'ACTIVAR') + ' esta empresa?').afterClosed().subscribe(res => {
        if (res) {
          row.status = (isActive ? 'INACTIVO' : 'ACTIVO');
          this.comDao.updateCompany(this.comDao.form.value);
          this.messageService.warn((isActive ? 'Inactivado' : 'Activado') + ' exitosamente!');
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
}
