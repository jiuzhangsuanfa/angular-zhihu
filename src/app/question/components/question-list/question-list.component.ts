import { Component, OnInit } from '@angular/core';
import { QuestionApiService } from '../../services/question-api.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {

  constructor(
    private api: QuestionApiService,
  ) { }

  ngOnInit() {
    this.api.getAnswersOfQuestion(1)
      .subscribe(console.log);
    this.api.getQuestions()
      .subscribe(console.log);
    this.api.getQuestion(1)
      .subscribe(console.log);
  }

}
