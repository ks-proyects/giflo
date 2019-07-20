import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { User } from 'src/app/shared/model/user';
import { Router } from '@angular/router';
import { noop as _noop } from 'lodash';
import { MessageService } from 'src/app/shared/services/message.service';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { EmployeService } from 'src/app/shared/datasource/employe.service';
import { ItemMenuService } from 'src/app/shared/datasource/item-menu.service';
import { BaseComponent } from '../base.component';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.less']
})
export class EmployeesComponent extends BaseComponent implements OnInit {
  dataSource: MatTableDataSource<User>;
  displayedColumns: string[] = ['names', 'status', 'phone' , 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  searchKey: string;
  data$: any;
  limit: number = 1000;
  full: boolean = true;
  constructor(
    private comDao: EmployeService,
    private dialogService: DialogService,
    private messageService: MessageService,
    public router: Router,
    public menu: ItemMenuService,
    private med: MediaMatcher,
    private cdr: ChangeDetectorRef
  ) {
    super(med, cdr);
  }

  ngOnInit() {
    this.getData();
  }
  getData() {
    let data: User[] = [];
    this.comDao.getEmployes().subscribe(dataRes => {
      data = dataRes.map(e => {
        return {
          $key: e.payload.doc.id,
          ...e.payload.doc.data()
        } as {};
      });
      data = data.filter(e => {
        return e.rol !== 'SUPERADMIN';
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
  hasMore = () => {
    return !this.dataSource || this.dataSource.data.length < this.limit;
  }
  handleScroll = (scrolled: boolean) => {
    scrolled ? this.getData() : _noop();
  }
  onView(row) {
    try {
      this.comDao.populateFormEmploye(row);
      this.router.navigate(['employe']);
    } catch (error) {
      console.log(error);
    }
  }

  onActive(row) {
    try {
      this.comDao.populateFormEmploye(row);
      this.comDao.updateEmployeForm(this.comDao.form.value, row.$key);
      this.messageService.warn('Actualizado exitosamente!');
    } catch (error) {
      console.log(error);
    }
  }

}
