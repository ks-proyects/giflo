import { Component, OnInit, ViewChild } from '@angular/core';
import { Sort, MatSort, MatTableDataSource } from '@angular/material';
import { noop as _noop } from 'lodash';
import { CompanyService } from 'src/app/dao/company.service';
import { CompanyModel } from 'src/app/shared/model/company-model';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.less']
})
export class CompanyListComponent implements OnInit {
  dataSource: MatTableDataSource<CompanyModel>;
  limit: number = 1000;
  displayedColumns: string[] = ['name', 'ruc', 'status', 'phone','convetional'];
  full: boolean = true;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private comDao: CompanyService) { }

  ngOnInit() {
    this.getData();
  }

  handleScroll = (scrolled: boolean) => {
    scrolled ? this.getData() : _noop();
  }
  hasMore = () => {
    debugger;
    return !this.dataSource || this.dataSource.data.length < this.limit;
  }

  getData() {
    let data: CompanyModel[] = [];
    this.comDao.findAll().subscribe(dataRes => {
      data = dataRes.map(e => {
        return {
            ...e.payload.doc.data()
        } as {};
      });
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
    });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
