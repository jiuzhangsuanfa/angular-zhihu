import { Component, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss']
})
export class SwitchComponent implements OnInit {

  value: boolean = true;

  @Output('value') emitter: EventEmitter<'popular' | 'latest'> = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  emit(value: boolean) {
    this.emitter.emit(value ? 'popular' : 'latest');
  }

}
