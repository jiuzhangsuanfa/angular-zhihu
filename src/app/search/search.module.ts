import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SearchHomeComponent } from './home/search-home.component';
import { SearchResultComponent } from './result/search-result.component';
import { SearchRoutingModule } from './search-routing.module';

@NgModule({
  declarations: [SearchHomeComponent, SearchResultComponent],
  imports: [
    CommonModule,
    SearchRoutingModule,
  ]
})
export class SearchModule { }
