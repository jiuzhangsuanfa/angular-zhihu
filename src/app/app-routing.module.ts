import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'question'
  },
  {
    path: 'question',
    loadChildren: () => import('./question/question.module')
      .then(({ QuestionModule }) => QuestionModule)
  },
  {
    path: 'answer',
    loadChildren: () => import('./answer/answer.module')
      .then(({ AnswerModule }) => AnswerModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
