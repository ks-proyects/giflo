import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { CompanyListDataSource } from './company-list-datasource';
import { CompanyDaoService } from 'src/app/dao/company-dao.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: CompanyListDataSource;

  constructor( private comDao: CompanyDaoService) {
  }
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];
  ngOnInit() {
    this.dataSource = new CompanyListDataSource(this.paginator, this.sort, this.comDao);
  }
}
