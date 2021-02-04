import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { mock } from 'mockjs';
import { asapScheduler, Observable, scheduled } from 'rxjs';
import { Answer, AnswerID, Question, QuestionID, UserID } from '../interfaces';
import { mockAnswer, mockQuestion, mockUser, mockVote } from '../utils';
import { delay, tap } from 'rxjs/operators';
import { CacheService } from '../services/cache/cache.service';

@Injectable()
export class MockApiInterceptor implements HttpInterceptor {

  constructor(
    private cache: CacheService,
  ) { }

  private regResource = /http:\/\/localhost:8080\/(.*)/;
  private regResourceWithID = /http:\/\/localhost:8080\/(.+)\/(.*)/;
  private data: any = {
    votes: (_: any, request: HttpRequest<any>) => mockVote(request),
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
    let resource = '';
    let id: string | undefined;
    let body;
    if (this.regResourceWithID.test(request.url)) {
      resource = this.regResourceWithID.exec(request.url)![1];
      id = this.regResourceWithID.exec(request.url)![2];
      switch (resource) {
        case 'questions':
          body = this.cache.getQuestion(+id);
          break;
        case 'answers':
          body = this.cache.getAnswer(+id);
          break;
      }
    } else {
      resource = this.regResource.exec(request.url)![1];
    }

    if (isDevMode()) {
      body = body || this.data[resource](id, request);
      return scheduled([new HttpResponse({ body })], asapScheduler)
        .pipe(
          delay(100 + Math.random() * 3000),
          tap(response => {
            switch (resource) {
              case 'questions':
                id
                  ? this.cache.setQuestion(response.body)
                  : response.body.forEach((question: Question) => this.cache.setQuestion(question));
                break;
              case 'answers':
                id
                  ? this.cache.setAnswer(response.body)
                  : response.body.forEach((answer: Answer) => this.cache.setAnswer(answer));
                break;
            }
          }),
        );
    }
    return next.handle(request);
  }

}
