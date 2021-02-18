import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToolbarType } from '../../interfaces';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Input('type') type: string = ToolbarType.CUSTOM;
  @Input('back') back: string = '..';
  @Input('disabled') disabled: boolean = false;
  @Output('search') searchEmitter: EventEmitter<string> = new EventEmitter();
  @Output('valueEmitter') valueEmitter: EventEmitter<string> = new EventEmitter();
  @Input('value') value: string = '';

  constructor(
    public router: Router,
  ) { }

  ngOnInit() { }

}
