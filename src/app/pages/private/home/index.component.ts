import { Component, OnInit, ViewChild, Input, ComponentFactoryResolver, OnDestroy } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-index',
  templateUrl: 'index.component.html',
  styleUrls: []
})
export class IndexComponent  {
  constructor() {
  }
}
