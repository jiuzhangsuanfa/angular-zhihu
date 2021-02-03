import { Component, Input, OnInit } from '@angular/core';
import { Answer } from 'src/app/common/interfaces';

@Component({
  selector: 'app-question-answer-card',
  templateUrl: './question-answer-card.component.html',
  styleUrls: ['./question-answer-card.component.scss']
})
export class QuestionAnswerCardComponent implements OnInit {

  @Input('answer') answer!: Answer;

  constructor() { }

  ngOnInit() { }

}
