import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchHomeComponent } from './home/search-home.component';
import { SearchResultComponent } from './result/search-result.component';

const routes: Routes = [
  { path: '', component: SearchHomeComponent },
  { path: ':id', component: SearchResultComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchRoutingModule { }
