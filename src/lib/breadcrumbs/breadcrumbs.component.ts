import { Component, Input, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BreadcrumbsService } from './breadcrumbs.service';

/**
 * This component shows a breadcrumbs trail for available routes the router can navigate to.
 * It subscribes to the router in order to update the breadcrumbs trail as you navigate to a component.
 */
@Component({
  selector: 'spr-breadcrumbs',
  templateUrl: './breadcrumbs.component.html'
})
export class BreadcrumbsComponent implements OnInit, OnChanges, OnDestroy {
  @Input() public prefix = '';

  public _urls: string[];
  public _routerSubscription: any;

  constructor(private _router: Router, private _breadcrumbsService: BreadcrumbsService) {}

  public ngOnInit(): void {
    this._urls = new Array();

    if (this.prefix.length > 0) {
      this._urls.unshift(this.prefix);
    }

    this._routerSubscription = this._router.events.subscribe((navigationEnd: NavigationEnd) => {
      if (navigationEnd instanceof NavigationEnd) {
        this._urls.length = 0; // fastest way to clear out array
        this.generateBreadcrumbsTrail(navigationEnd.urlAfterRedirects ? navigationEnd.urlAfterRedirects : navigationEnd.url);
      }
    });
  }

  public ngOnChanges(changes: any): void {
    if (!this._urls) {
      return;
    }

    this._urls.length = 0;
    this.generateBreadcrumbsTrail(this._router.url);
  }

  public generateBreadcrumbsTrail(url: string): void {
    if (!this._breadcrumbsService.isRouteHidden(url)) {
      // Add url to beginning of array (since the url is being recursively broken down from full url to its parent)
      this._urls.unshift(url);
    }

    if (url.lastIndexOf('/') > 0) {
      // Find last '/' and add everything before it as a parent route
      this.generateBreadcrumbsTrail(url.substr(0, url.lastIndexOf('/')));
    } else if (this.prefix.length > 0) {
      this._urls.unshift(this.prefix);
    }
  }

  public navigateTo(url: string): void {
    this._router.navigateByUrl(url);
  }

  public friendlyName(url: string): string {
    return !url ? '' : this._breadcrumbsService.getFriendlyNameForRoute(url);
  }

  public ngOnDestroy(): void {
    this._routerSubscription.unsubscribe();
  }
}
