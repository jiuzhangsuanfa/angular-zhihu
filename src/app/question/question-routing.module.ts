import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionListComponent } from './components/list/question-list.component';
import { QuestionDetailComponent } from './components/detail/question-detail.component';

const routes: Routes = [
  {
    path: '',
    component: QuestionListComponent,
    data: { reuse: false },
  },
  {
    path: ':id',
    component: QuestionDetailComponent,
    data: { reuse: true },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionRoutingModule { }
