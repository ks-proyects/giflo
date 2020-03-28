import {
  ChangeDetectorRef,
  Component,
  NgZone,
  Input,
  OnInit,
  ViewChild,
  HostListener,
  Directive,
  AfterViewInit
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { MediaMatcher, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: []
})
export class AppBreadcrumbComponent implements OnInit {
  @Input() layout;
  pageInfo;
  isMovile = false;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private breakpointObserver: BreakpointObserver
  ) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .pipe(map(() => this.activatedRoute))
      .pipe(
        map(route => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        })
      )
      .pipe(filter(route => route.outlet === 'primary'))
      .pipe(mergeMap(route => route.data))
      .subscribe(event => {
        this.titleService.setTitle(event['title']);
        this.pageInfo = event;
      });
    breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
      this.isMovile = result.matches ? true : false;
    });
  }
  ngOnInit() { }
}
