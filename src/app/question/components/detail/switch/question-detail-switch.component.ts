import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-question-detail-switch',
  templateUrl: './question-detail-switch.component.html',
  styleUrls: ['./question-detail-switch.component.scss']
})
export class QuestionDetailSwitchComponent implements OnInit {

  value: boolean = true;

  @Output('value') emitter: EventEmitter<'popular' | 'latest'> = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  emit(value: boolean) {
    this.emitter.emit(value ? 'popular' : 'latest');
  }

}
