import { NgModule } from '@angular/core';
import { LoadingModule } from '../common/components/loading/loading.module';
import { MaterialModule } from '../common/modules/material.module';
import { PipeModule } from '../common/modules/pipe.module';
import { SharedModule } from '../common/modules/shared.module';
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
    QuestionDetailComponent,
    QuestionDetailSwitchComponent,
    QuestionDetailAnswerCardComponent,
  ],
  imports: [
    SharedModule,
    QuestionRoutingModule,
    MaterialModule,
    LoadingModule,
    PipeModule,
  ],
})
export class QuestionModule { }
