import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource, MatDialogConfig } from '@angular/material';
import { noop as _noop } from 'lodash';
import { Router } from '@angular/router';
import { CompanyService } from '../../shared/datasource/company.service';
import { DialogService } from '../../shared/services/dialog.service';
import { MessageService } from '../../shared/services/message.service';
import { User } from '../../shared/model/user';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.less']
})
export class CompanyListComponent implements OnInit {
  dataSource: MatTableDataSource<User>;
  displayedColumns: string[] = ['names', 'email', 'status', 'phone' , 'actions'];

  limit: number = 1000;
  full: boolean = true;
  @ViewChild(MatSort) sort: MatSort;
  searchKey: string;
  data$: any;
  constructor(
    private comDao: CompanyService,
    private dialogService: DialogService,
    private messageService: MessageService,
    public router: Router
    ) {
    }

  ngOnInit() {
    this.getData();
  }
  getData() {
    let data: User[] = [];
    this.comDao.getCompanies().subscribe(dataRes => {
      data = dataRes.map(e => {
        return {
          $key: e.payload.doc.id,
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
    this.searchKey = '';
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
    this.comDao.initFormCompany();
  }

  onView(row) {
    try {
      this.comDao.populateFormCompany(row);
      this.router.navigate(['company']);
    } catch (error) {
      console.log(error);
    }
  }

  onActive(row) {
    try {
      const isActive = row.status === 'ACTIVO';
      this.dialogService.openConfirmDialog('¿Está seguro de ' +
      (isActive ? 'INACTIVAR' : 'ACTIVAR') + ' esta empresa?').afterClosed().subscribe(res => {
        if (res) {
          row.status = (isActive ? 'INACTIVO' : 'ACTIVO');
          this.comDao.populateFormCompany(row);
          this.comDao.updateCompanyForm(this.comDao.form.value, row.$key);
          this.messageService.warn((isActive ? 'Inactivado' : 'Activado') + ' exitosamente!');
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
}
