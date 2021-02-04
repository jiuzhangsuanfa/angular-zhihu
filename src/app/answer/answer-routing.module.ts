import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnswerDetailComponent } from './components/detail/answer-detail.component';

const routes: Routes = [
  {
    path: ':id',
    component: AnswerDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnswerRoutingModule { }
