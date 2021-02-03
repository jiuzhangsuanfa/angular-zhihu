import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { mock } from 'mockjs';
import { asapScheduler, Observable, scheduled } from 'rxjs';
import { AnswerID, QuestionID, UserID } from '../interfaces';
import { mockAnswer, mockQuestion, mockUser, mockVote } from '../utils';
import { delay } from 'rxjs/operators';

@Injectable()
export class MockApiInterceptor implements HttpInterceptor {

  private regResource = /http:\/\/localhost:8080\/(.*)/;
  private regResourceWithID = /http:\/\/localhost:8080\/(.+)\/(.*)/;
  private data: any = {
    votes: (id: number) => id
      ? mockVote(id)
      : mock({ 'array|10': [() => mockVote()] })['array'],
    questions: (id?: QuestionID) => id
      ? mockQuestion(id)
      : mock({ 'array|10': [() => mockQuestion()] })['array'],
    answers: (id?: AnswerID) => id
      ? mockAnswer(id)
      : mock({ 'array|10': [() => mockAnswer()] })['array'],
    users: (id?: UserID) => id
      ? mockUser(id)
      : mock({ 'array|10': [() => mockUser()] })['array'],
  };

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (isDevMode()) {
      let resource = '';
      let id;
      if (this.regResourceWithID.test(request.url)) {
        resource = this.regResourceWithID.exec(request.url)![1];
        id = this.regResourceWithID.exec(request.url)![2];
      } else {
        resource = this.regResource.exec(request.url)![1];
      }
      const body = this.data[resource](id);
      return scheduled([new HttpResponse({ body })], asapScheduler)
        .pipe(delay(100 + Math.random() * 3000));
    }
    return next.handle(request);
  }

}
