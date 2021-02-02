import { NgModule } from '@angular/core';
import { SharedModule } from '../common/modules/shared.module';
import { QuestionListComponent } from './components/question-list/question-list.component';
import { QuestionRoutingModule } from './question-routing.module';

@NgModule({
  declarations: [
    QuestionListComponent,
  ],
  imports: [
    SharedModule,
    QuestionRoutingModule,
  ],
})
export class QuestionModule { }
