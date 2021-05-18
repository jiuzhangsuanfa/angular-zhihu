import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { HOST as host } from 'src/app/common/constants';
import { Answer, AnswerID, QuestionID, ResourceType, Question } from 'src/app/common/interfaces';
import { join } from 'src/app/common/utils';

@Injectable({
  providedIn: 'root',
})
export class AnswerApiService {

  constructor(
    private http: HttpClient,
  ) { }

  getAnswer(id: AnswerID): Observable<Answer> {
    const url = join({ host, segments: [ResourceType.answers, id] });
    return this.http.get<Answer>(url)
      .pipe(
        tap(console.log),
        map(value => value.data),
        map((answer: any) => ({
          id: answer.id,
          title: answer.title,
          content: answer.content,
          user: {
            id: answer.userId,
          },
          count: {
            answer: answer.answerCount,
          },
          tags: [],
          date: answer.gmtCreate,
        }),
        ),
        tap(console.log),
      );
  }
  approveAnswer(id: AnswerID): Observable<Answer> {
    const params = { action: 'approve', answer: id };
    const url = join({ host, segments: [ResourceType.votes], params });
    return this.http.put<Answer>(url, {})
      .pipe(
        tap(console.log),
      );
  }

  cancelApproveAnswer(id: AnswerID): Observable<Answer> {
    const params = { action: 'approve', answer: id };
    const url = join({ host, segments: [ResourceType.votes], params });
    return this.http.delete<Answer>(url);
  }

  opposeAnswer(id: AnswerID): Observable<Answer> {
    const params = { action: 'oppose', answer: id };
    const url = join({ host, segments: [ResourceType.votes], params });
    return this.http.put<Answer>(url, {});
  }

  cancelOpposeAnswer(id: AnswerID): Observable<Answer> {
    const params = { action: 'oppose', answer: id };
    const url = join({ host, segments: [ResourceType.votes], params });
    return this.http.delete<Answer>(url);
  }

  publishAnswer(answer: Partial<Answer>): Observable<Answer> {
    const url = join({ host, segments: [ResourceType.answers] });
    return this.http.post<Answer>(url, answer)
      .pipe(
        tap(console.log),
      );
  }

}
