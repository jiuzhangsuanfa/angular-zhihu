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
      .then(({ QuestionModule }) => QuestionModule),
    data: { reuse: true },
  },
  {
    path: 'answer',
    loadChildren: () => import('./answer/answer.module')
      .then(({ AnswerModule }) => AnswerModule),
    data: { reuse: true },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
