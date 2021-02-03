import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MockApiInterceptor } from '../interceptors/mock-api.interceptor';

@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: MockApiInterceptor, multi: true },
  ]
})
export class MockApiModule { }
