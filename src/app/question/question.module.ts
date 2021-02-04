import { NgModule } from '@angular/core';
import { LoadingModule } from '../common/components/loading/loading.module';
import { MaterialModule } from '../common/modules/material.module';
import { SharedModule } from '../common/modules/shared.module';
import { ReadifyPipe } from '../common/pipes/readify/readify.pipe';
import { QuestionDetailAnswerCardComponent } from './components/detail/answer-card/question-detail-answer-card.component';
import { QuestionDetailComponent } from './components/detail/question-detail.component';
import { QuestionDetailSwitchComponent } from './components/detail/switch/question-detail-switch.component';
import { QuestionCardComponent } from './components/list/card/question-card.component';
import { QuestionListComponent } from './components/list/question-list.component';
import { QuestionRoutingModule } from './question-routing.module';

@NgModule({
  declarations: [
    QuestionListComponent,
    QuestionCardComponent,
    ReadifyPipe,
    QuestionDetailComponent,
    QuestionDetailSwitchComponent,
    QuestionDetailAnswerCardComponent,
  ],
  imports: [
    SharedModule,
    QuestionRoutingModule,
    MaterialModule,
    LoadingModule,
  ],
})
export class QuestionModule { }
