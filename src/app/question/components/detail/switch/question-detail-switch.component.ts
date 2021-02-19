import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-question-detail-switch',
  templateUrl: './question-detail-switch.component.html',
  styleUrls: ['./question-detail-switch.component.scss']
})
export class QuestionDetailSwitchComponent implements OnInit {

  // eslint-disable-next-line @angular-eslint/no-output-rename
  @Output('value') emitter = new EventEmitter<'popular' | 'latest'>();

  value = true;

  constructor() { }

  ngOnInit() { }

  emit(value: boolean) {
    this.emitter.emit(value ? 'popular' : 'latest');
  }

}
