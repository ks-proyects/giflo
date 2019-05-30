import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/dao/company.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.less']
})
export class CompanyListComponent implements OnInit {

  constructor(public daoComp: CompanyService) { }

  ngOnInit() {
  }

}
