import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Answer, Question, QuestionID } from 'src/app/common/interfaces';
import { QuestionApiService } from '../../services/question-api.service';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.scss']
})
export class QuestionDetailComponent implements OnInit {

  question?: Question;
  answers?: Answer[];
  id: QuestionID;
  fetchType!: string;

  constructor(
    private api: QuestionApiService,
    private route: ActivatedRoute,
  ) {
    this.id = +route.snapshot.paramMap.get('id')!;
  }

  ngOnInit() {
    this.api.getQuestion(this.id)
      .subscribe(question => this.question = question);
    this.getFetchType('popular');
  }

  trackByAnswerId(index: number, answer: Answer) {
    return answer.id;
  }

  getFetchType(value: 'popular' | 'latest') {
    this.fetchType = value;
    this.api.getAnswersOfQuestion(this.id)
      .subscribe(answers => this.answers = answers);
  }

}
