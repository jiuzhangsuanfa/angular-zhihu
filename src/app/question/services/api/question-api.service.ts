import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { HOST as host } from 'src/app/common/constants';
import { Answer, Question, QuestionID, ResourceType } from 'src/app/common/interfaces';
import { join } from 'src/app/common/utils';

@Injectable({
  providedIn: 'root',
})
export class QuestionApiService {

  constructor(
    private http: HttpClient,
  ) { }

  getQuestions(start: QuestionID = 0): Observable<Question[]> {
    const url = join({ host, segments: [ResourceType.questions] });
    return this.http.get<Question[]>(url)
      .pipe(
        tap(console.log),
        map(value => value.data.records),
        map(
          questions => questions.map((question: any) => ({
            id: question.id,
            title: question.title,
            content: question.content,
            user: {
              id: question.userId,
            },
            count: {
              answer: question.answerCount,
            },
            tags: [],
            date: question.gmtCreate,
          })),
        ),
        tap(console.log),
      );
  }

  getQuestion(id: QuestionID): Observable<Question> {
    const url = join({ host, segments: [ResourceType.questions, id] });
    return this.http.get<Question>(url)
      .pipe(
        tap(console.log),
        map(value => value.data.records),
        map(
          questions => questions.map((question: any) => ({
            id: question.id,
            title: question.title,
            content: question.content,
            user: {
              id: question.userId,
            },
            count: {
              answer: question.answerCount,
            },
            tags: [],
            date: question.gmtCreate,
          })),
        ),
        tap(console.log),
      );
  }

  publishQuestion(question: Partial<Question>): Observable<Question> {
    const url = join({ host, segments: [ResourceType.questions] });
    return this.http.post<Question>(url, question)
      .pipe(
        tap(console.log),
      );
  }

  approveQuestion(id: QuestionID): Observable<Question> {
    const params = { action: 'approve', question: id };
    const url = join({ host, segments: [ResourceType.votes], params });
    return this.http.put<Question>(url, {});
  }

  cancelApproveQuestion(id: QuestionID): Observable<Question> {
    const params = { action: 'approve', question: id };
    const url = join({ host, segments: [ResourceType.votes], params });
    return this.http.delete<Question>(url);
  }

  opposeQuestion(id: QuestionID): Observable<Question> {
    const params = { action: 'oppose', question: id };
    const url = join({ host, segments: [ResourceType.votes], params });
    return this.http.put<Question>(url, {});
  }

  cancelOpposeQuestion(id: QuestionID): Observable<Question> {
    const params = { action: 'oppose', question: id };
    const url = join({ host, segments: [ResourceType.votes], params });
    return this.http.delete<Question>(url);
  }

  getAnswersOfQuestion(questionId: QuestionID, next: QuestionID = 0): Observable<Answer[]> {
    const params = { questionId, next };
    const url = join({ host, segments: [ResourceType.answers], params });
    return this.http.get<Answer[]>(url)
      .pipe(
        tap(console.log),
        map(value => value.data.records),
        map(
          answers => answers.map((answer: any) => ({
            id: answer.id,
            content: answer.content,
            user: {
              id: answer.userId,
            },
          })),
        ),
        //tap(console.log),
      );
  }

}
