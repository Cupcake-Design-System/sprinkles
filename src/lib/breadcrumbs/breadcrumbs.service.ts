import { Injectable } from '@angular/core';

@Injectable()
export class BreadcrumbsService {

    private _routesFriendlyNames: Map<string, string> = new Map<string, string>();
    private _routesFriendlyNamesRegex: Map<string, string> = new Map<string, string>();
    private _routesWithCallback: Map<string, (val: string) => string> = new Map<string, (val: string) => string>();
    private _routesWithCallbackRegex: Map<string, (val: string) => string> = new Map<string, (val: string) => string>();
    private _hideRoutes: any = new Array<string>();
    private _hideRoutesRegex: any = new Array<string>();

    /**
     * Specify a friendly name for the corresponding route.
     */
    public addFriendlyNameForRoute(route: string, name: string): void {
        this._routesFriendlyNames.set(route, name);
    }

    /**
     * Specify a friendly name for the corresponding route matching a regular expression.
     */
    public addFriendlyNameForRouteRegex(routeRegex: string, name: string): void {
        this._routesFriendlyNamesRegex.set(routeRegex, name);
    }

    /**
     * Specify a callback for the corresponding route.
     * When a mathing url is navigatedd to, the callback function is invoked to get the name to be displayed in the breadcrumbs.
     */
    public addCallbackForRoute(route: string, callback: (id: string) => string): void {
        this._routesWithCallback.set(route, callback);
    }

    /**
     * Specify a callback for the corresponding route matching a regular expression.
     * When a mathing url is navigatedd to, the callback function is invoked to get the name to be displayed in the breadcrumbs.
     */
    public addCallbackForRouteRegex(routeRegex: string, callback: (id: string) => string): void {
        this._routesWithCallbackRegex.set(routeRegex, callback);
    }

    /**
     * Show the friendly name for a given route (url). If no match is found the url (without the leading '/') is shown.
     */
    public getFriendlyNameForRoute(route: string): string {
        const routeEnd = route.substr(route.lastIndexOf('/') + 1, route.length);
        let name: string = routeEnd;

        this._routesFriendlyNames.forEach((value, key, map) => {
            if (key === route) {
                name = value;
            }
        });

        this._routesFriendlyNamesRegex.forEach((value, key, map) => {
            if (new RegExp(key).exec(route)) {
                name = value;
            }
        });

        this._routesWithCallback.forEach((value, key, map) => {
            if (key === route) {
                name = value(routeEnd);
            }
        });

        this._routesWithCallbackRegex.forEach((value, key, map) => {
            if (new RegExp(key).exec(route)) {
                name = value(routeEnd);
            }
        });

        return name;
    }

    /**
     * Specify a route (url) that should not be shown in the breadcrumbs.
     */
    public hideRoute(route: string): void {
        if (this._hideRoutes.indexOf(route) === -1) {
            this._hideRoutes.push(route);
        }
    }

    /**
     * Specify a route (url) regular expression that should not be shown in the breadcrumbs.
     */
    public hideRouteRegex(routeRegex: string): void {
        if (this._hideRoutesRegex.indexOf(routeRegex) === -1) {
            this._hideRoutesRegex.push(routeRegex);
        }
    }

    /**
     * Returns true if a route should be hidden.
     */
    public isRouteHidden(route: string): boolean {
        let hide = this._hideRoutes.indexOf(route) > -1;

        this._hideRoutesRegex.forEach((value: any) => {
            if (new RegExp(value).exec(route)) {
                hide = true;
            }
        });

        return hide;
    }
}
