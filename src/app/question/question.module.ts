import { NgModule } from '@angular/core';
import { MaterialModule } from '../common/modules/material.module';
import { SharedModule } from '../common/modules/shared.module';
import { ReadifyPipe } from '../common/pipes/readify/readify.pipe';
import { QuestionCardComponent } from './components/question-card/question-card.component';
import { QuestionListComponent } from './components/question-list/question-list.component';
import { QuestionRoutingModule } from './question-routing.module';

@NgModule({
  declarations: [
    QuestionListComponent,
    QuestionCardComponent,
    ReadifyPipe,
  ],
  imports: [
    SharedModule,
    QuestionRoutingModule,
    MaterialModule,
  ],
})
export class QuestionModule { }
