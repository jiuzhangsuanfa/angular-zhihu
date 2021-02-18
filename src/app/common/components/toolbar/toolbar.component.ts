import { Component, Input, OnInit } from '@angular/core';
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
  @Input('search') search?: (value: string) => any;

  constructor() { }

  ngOnInit() { }

}
