import { NgModule } from '@angular/core';
import { SharedModule } from '../common/modules/shared.module';
import { QuestionCardComponent } from './components/question-card/question-card.component';
import { QuestionListComponent } from './components/question-list/question-list.component';
import { QuestionRoutingModule } from './question-routing.module';

@NgModule({
  declarations: [
    QuestionListComponent,
    QuestionCardComponent,
  ],
  imports: [
    SharedModule,
    QuestionRoutingModule,
  ],
})
export class QuestionModule { }
