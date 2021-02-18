import { NgModule } from '@angular/core';
import { ToolbarModule } from '../common/components/toolbar/toolbar.module';
import { MaterialModule } from '../common/modules/material.module';
import { SharedModule } from '../common/modules/shared.module';
import { SearchHomeComponent } from './home/search-home.component';
import { SearchResultComponent } from './result/search-result.component';
import { SearchRoutingModule } from './search-routing.module';

@NgModule({
  declarations: [SearchHomeComponent, SearchResultComponent],
  imports: [
    SharedModule,
    SearchRoutingModule,
    MaterialModule,
    ToolbarModule,
  ]
})
export class SearchModule { }