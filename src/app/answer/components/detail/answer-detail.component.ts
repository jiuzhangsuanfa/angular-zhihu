import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mergeMap, tap } from 'rxjs/operators';
import { Answer, AnswerID, AnswerStatus, Question } from 'src/app/common/interfaces';
import { QuestionApiService } from 'src/app/question/services/api/question-api.service';
import { AnswerApiService } from '../../services/api/answer-api.service';

@Component({
  selector: 'app-answer-detail',
  templateUrl: './answer-detail.component.html',
  styleUrls: ['./answer-detail.component.scss']
})
export class AnswerDetailComponent implements OnInit {

  id: AnswerID;
  answer?: Answer;
  question?: Question;

  constructor(
    private api: AnswerApiService,
    private route: ActivatedRoute,
    private questionApi: QuestionApiService,
  ) {
    this.id = +route.snapshot.paramMap.get('id')!;
  }

  ngOnInit() {
    this.api.getAnswer(this.id)
      .pipe(
        tap(answer => this.answer = answer),
        mergeMap(answer => this.questionApi.getQuestion(answer.question)),
      )
      .subscribe(question => this.question = question);
  }

  approve() {
    if (this.answer?.status === AnswerStatus.APPROVE) {
      // this.api.approveAnswer(this.id)
      //   .subscribe(answer => this.answer = answer);
      this.answer!.status = AnswerStatus.NONE;
    } else {
      // this.api.cancelApproveAnswer(this.id)
      //   .subscribe(answer => this.answer = answer);
      this.answer!.status = AnswerStatus.APPROVE;
    }
  }

  oppose() {
    if (this.answer?.status === AnswerStatus.OPPOSE) {
      // this.api.opposeAnswer(this.id)
      //   .subscribe(answer => this.answer = answer);
      this.answer!.status = AnswerStatus.NONE;
    } else {
      // this.api.cancelOpposeAnswer(this.id)
      //   .subscribe(answer => this.answer = answer);
      this.answer!.status = AnswerStatus.OPPOSE;
    }
  }

}
