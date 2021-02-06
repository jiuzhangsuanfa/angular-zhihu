import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from '@angular/router';
import { concat, getPaths } from '../../utils';

export class ReuseStrategy extends RouteReuseStrategy {

  private cache: Map<string, DetachedRouteHandle> = new Map();

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return !!route.data.reuse;
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    this.cache.set(concat(getPaths(route.root)), handle);
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return this.cache.has(concat(getPaths(route.root)));
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    return this.cache.get(concat(getPaths(route.root)))!;
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return future.routeConfig === curr.routeConfig;
  }

}
