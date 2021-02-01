import { NgModule } from '@angular/core';
import { SharedModule } from '../common/modules/shared.module';
import { QuestionRoutingModule } from './question-routing.module';

@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    QuestionRoutingModule,
  ],
})
export class QuestionModule { }
