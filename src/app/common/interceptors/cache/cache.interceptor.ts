import {
  HttpEvent,

  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { CacheService } from '../../services/cache/cache.service';
import { Link } from '../../utils';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {

  constructor(
    private cache: CacheService,
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const link = new Link(request.urlWithParams);
    const resource = link.getResource();
    const id = link.getID();

    if (resource && id && this.cache.has(resource, id)) {
      return of(
        new HttpResponse({ body: this.cache.get(resource, id) }),
      );
    }

    if (resource && id) {
      return next
        .handle(request)
        .pipe(
          filter((event: any) => event instanceof HttpResponse),
          tap(({ body }: HttpResponse<any>) => this.cache.set(resource, body)),
        );
    }

    if (resource) {
      return next
        .handle(request)
        .pipe(
          filter((event: any) => event instanceof HttpResponse),
          tap(({ body }: HttpResponse<any[]>) => body?.forEach(value => this.cache.set(resource, value))),
        );
    }

    return next.handle(request);

  }

}
