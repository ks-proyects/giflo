import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { CompanyList2DataSource } from './company-list2-datasource';

@Component({
  selector: 'app-company-list2',
  templateUrl: './company-list2.component.html',
  styleUrls: ['./company-list2.component.css']
})
export class CompanyList2Component implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: CompanyList2DataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];
  ngOnInit() {
    this.dataSource = new CompanyList2DataSource(this.paginator, this.sort);
  }
}
