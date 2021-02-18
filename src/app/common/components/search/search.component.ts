import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { Subject, Subscription } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  @Input() disabled: boolean = false;

  @Input() value: string = '';
  @Output() valueChange: EventEmitter<any> = new EventEmitter();

  @Output('enter') enterEmitter: EventEmitter<any> = new EventEmitter();

  @ViewChild('search') search!: ElementRef<HTMLInputElement>;

  private subject: Subject<string> = new Subject();
  private subscription?: Subscription;

  private innerValue?: string;

  constructor() { }

  ngOnInit() {
    this.innerValue = this.value;
    this.subscription = this.subject
      .pipe(throttleTime(200))
      .subscribe(value => this.valueChange.emit(this.innerValue = value));
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  enter() {
    this.enterEmitter.next(this.value);
  }

  emit(event: any) {
    this.subject.next(this.value = event.target.value);
  }

  exist() {
    return this.innerValue && this.innerValue.length > 0;
  }

  clear() {
    this.innerValue = this.value = '';
    this.search.nativeElement.focus();
  }

}
