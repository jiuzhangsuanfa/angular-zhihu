import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mergeMap, tap } from 'rxjs/operators';
import { Answer, AnswerID, AnswerStatus, Question } from 'src/app/common/interfaces';
import { transform } from 'src/app/common/utils';
import { QuestionApiService } from 'src/app/question/services/api/question-api.service';
import { AnswerApiService } from '../../services/api/answer-api.service';

@Component({
  selector: 'app-answer-detail',
  templateUrl: './answer-detail.component.html',
  styleUrls: ['./answer-detail.component.scss'],
})
export class AnswerDetailComponent implements OnInit {

  id: AnswerID;
  answer?: Answer;
  question?: Question;

  back = '/question';

  constructor(
    private api: AnswerApiService,
    private route: ActivatedRoute,
    private questionApi: QuestionApiService,
  ) {
    this.id = +(route.snapshot.paramMap.get('id') || 0);
  }

  ngOnInit() {
    this.api.getAnswer(this.id)
      .pipe(
        tap(async answer => this.answer = { ...answer, content: await transform(answer.content) }),
        mergeMap(answer => this.questionApi.getQuestion(answer.question)),
      )
      .subscribe(question => {
        this.question = question;
        this.back = `/question/${question.id}`;
      });
    // this.api.approveAnswer(this.id)
    //   .subscribe(count => this.answer?.count);
    // this.api.cancelApproveAnswer(this.id)
    //   .subscribe(answer => this.answer = answer);
    // this.api.opposeAnswer(this.id)
    //   .subscribe(answer => this.answer = answer);
    // this.api.cancelOpposeAnswer(this.id)
    //   .subscribe(answer => this.answer = answer);
  }

  approve() {
    if (this.answer?.status === AnswerStatus.approve) {
      this.api.cancelApproveAnswer(this.id)
        .subscribe(answer => this.answer = answer);
      this.answer.status = AnswerStatus.none;
    } else if (this.answer?.status === AnswerStatus.oppose || this.answer?.status === AnswerStatus.none) {
      // this.api.approveAnswer(this.id)
      //   .subscribe(answer => this.answer = answer);
      this.answer.status = AnswerStatus.approve;
    }
    // console.log(this.id);
  }

  oppose() {
    if (this.answer?.status === AnswerStatus.oppose) {
      this.api.cancelOpposeAnswer(this.id)
        .subscribe(answer => this.answer = answer);

      this.answer.status = AnswerStatus.none;
    } else if (this.answer?.status === AnswerStatus.approve || this.answer?.status === AnswerStatus.none) {
      // this.api.opposeAnswer(this.id)
      //   .subscribe(answer => this.answer = answer);
      this.answer.status = AnswerStatus.oppose;
    }
  }

}
