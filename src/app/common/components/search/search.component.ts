import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  @Input() disabled = false;

  @Input() value = '';
  @Output() valueChange = new EventEmitter<any>();

  @Output() enter = new EventEmitter<any>();

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

  emitEnter() {
    this.enter.next(this.value);
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
