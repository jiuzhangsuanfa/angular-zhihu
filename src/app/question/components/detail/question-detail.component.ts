import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Answer, Question, QuestionID } from 'src/app/common/interfaces';
import { transform } from 'src/app/common/utils';
import { QuestionApiService } from '../../services/api/question-api.service';

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
      .subscribe(
        async question => this.question = { ...question, content: await transform(question.content) }
      );
    this.fetchAnswers('popular');
  }

  trackByAnswerId(index: number, answer: Answer) {
    return answer.id;
  }

  fetchAnswers(value: 'popular' | 'latest') {
    this.answers = undefined;
    this.fetchType = value;
    this.api.getAnswersOfQuestion(this.id)
      .subscribe(answers => this.answers = answers);
  }

}
