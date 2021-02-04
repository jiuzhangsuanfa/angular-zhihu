import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/common/interfaces';
import { QuestionApiService } from '../../services/api/question-api.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {

  questions: Question[] = [];

  constructor(
    private api: QuestionApiService,
  ) { }

  ngOnInit() {
    this.api.getQuestions()
      .subscribe(questions => this.questions = questions);
  }

}
