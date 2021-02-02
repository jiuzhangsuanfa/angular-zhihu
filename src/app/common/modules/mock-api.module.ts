import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { MockApiService } from '../services/mock-api/mock-api.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      MockApiService,
      { dataEncapsulation: false },
    )
  ],
  exports: [
    HttpClientInMemoryWebApiModule
  ]
})
export class MockApiModule { }
