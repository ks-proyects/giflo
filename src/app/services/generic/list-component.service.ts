import { Injectable, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class ListComponentService {

  displayedColumns = ['id', 'nombre', 'estado'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, {}) paginator: MatPaginator;
  @ViewChild(MatSort, {}) sort: MatSort;
  constructor() { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}
