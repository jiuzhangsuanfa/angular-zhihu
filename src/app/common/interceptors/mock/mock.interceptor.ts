import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { mock } from 'mockjs';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AnswerID, Question, QuestionID, ResourceType, UserID } from '../../interfaces';
import { Link, mockAnswer, mockQuestion, mockUser, mockVote } from '../../utils';

@Injectable()
export class MockInterceptor implements HttpInterceptor {

  private data: any = {
    votes: (_: any, request: HttpRequest<any>) => mockVote(request),
    questions: (id?: QuestionID) => id
      ? mockQuestion(id)
      : mock({ 'array|10': [() => mockQuestion()] })['array'],
    answers: (id?: AnswerID, link?: Link) => id
      ? mockAnswer(id, +link?.getParam('question')! || undefined)
      : mock({ 'array|10': [() => mockAnswer(undefined, +link?.getParam('question')! || undefined)] })['array'],
    users: (id?: UserID) => id
      ? mockUser(id)
      : mock({ 'array|10': [() => mockUser()] })['array'],
  };

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const link = new Link(request.urlWithParams);
    const { resource, id } = link;

    if (isDevMode()) {
      const body = this.adapt(request, link) || this.data[resource](id, link);
      return of(new HttpResponse({ body }))
        .pipe(
          delay(100 + Math.random() * 3000),
        );
    }

    return next.handle(request);

  }

  adapt(request: HttpRequest<any>, { id, resource, params }: Link): any | undefined {
    if (resource === ResourceType.QUESTIONS && request.method === 'POST') {
      const question: Question = {
        ...mockQuestion(),
        title: request.body.title,
        content: request.body.content,
        tags: request.body.tags,
      };
      return question;
    }
  }

}
