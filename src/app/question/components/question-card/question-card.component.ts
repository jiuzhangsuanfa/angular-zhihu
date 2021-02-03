import { Component, Input, OnInit } from '@angular/core';
import { Question } from 'src/app/common/interfaces';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss']
})
export class QuestionCardComponent implements OnInit {

  @Input('question') question?: Question;

  constructor() { }

  ngOnInit() { }

}
