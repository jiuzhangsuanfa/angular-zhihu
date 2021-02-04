import { NgModule } from '@angular/core';
import { LoadingModule } from '../common/components/loading/loading.module';
import { MaterialModule } from '../common/modules/material.module';
import { SharedModule } from '../common/modules/shared.module';
import { ReadifyPipe } from '../common/pipes/readify/readify.pipe';
import { QuestionAnswerCardComponent } from './components/question-answer-card/question-answer-card.component';
import { QuestionCardComponent } from './components/question-card/question-card.component';
import { QuestionDetailSwitchComponent } from './components/question-detail/question-detail-switch/question-detail-switch.component';
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
    QuestionDetailSwitchComponent,
  ],
  imports: [
    SharedModule,
    QuestionRoutingModule,
    MaterialModule,
    LoadingModule,
  ],
})
export class QuestionModule { }
