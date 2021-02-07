import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourceType } from './common/interfaces';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: ResourceType.QUESTION,
  },
  {
    path: ResourceType.QUESTION,
    loadChildren: () => import('./question/question.module')
      .then(({ QuestionModule }) => QuestionModule),
    data: { reuse: true },
  },
  {
    path: ResourceType.ANSWER,
    loadChildren: () => import('./answer/answer.module')
      .then(({ AnswerModule }) => AnswerModule),
    data: { reuse: false },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
