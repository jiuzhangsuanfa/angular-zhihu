import { NgModule } from '@angular/core';
import { LoadingModule } from '../common/components/loading/loading.module';
import { MaterialModule } from '../common/modules/material.module';
import { SharedModule } from '../common/modules/shared.module';
import { AnswerRoutingModule } from './answer-routing.module';
import { AnswerDetailComponent } from './components/detail/answer-detail.component';

@NgModule({
  declarations: [AnswerDetailComponent],
  imports: [
    SharedModule,
    AnswerRoutingModule,
    MaterialModule,
    LoadingModule,
  ],
})
export class AnswerModule { }
