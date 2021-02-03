import { NgModule } from '@angular/core';
import { SwitchModule } from '../common/components/switch/switch.module';
import { MaterialModule } from '../common/modules/material.module';
import { SharedModule } from '../common/modules/shared.module';
import { ReadifyPipe } from '../common/pipes/readify/readify.pipe';
import { QuestionAnswerCardComponent } from './components/question-answer-card/question-answer-card.component';
import { QuestionCardComponent } from './components/question-card/question-card.component';
import { QuestionDetailComponent } from './components/question-detail/question-detail.component';
import { QuestionListComponent } from './components/question-list/question-list.component';
import { QuestionRoutingModule } from './question-routing.module';

@NgModule({
  declarations: [
    QuestionListComponent,
    QuestionCardComponent,
    ReadifyPipe,
    QuestionDetailComponent,
    QuestionAnswerCardComponent,
  ],
  imports: [
    SharedModule,
    QuestionRoutingModule,
    MaterialModule,
    SwitchModule,
  ],
})
export class QuestionModule { }
