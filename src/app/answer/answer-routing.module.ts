import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnswerDetailComponent } from './components/detail/answer-detail.component';
import { AnswerPublishComponent } from './components/publish/answer-publish.component';

const routes: Routes = [
  {
    path: 'new',
    component: AnswerPublishComponent,
    data: { reuse: false },
  },
  {
    path: ':id',
    component: AnswerDetailComponent,
    data: { reuse: true },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnswerRoutingModule { }
