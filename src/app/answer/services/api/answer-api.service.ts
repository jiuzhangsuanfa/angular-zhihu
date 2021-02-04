import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HOST } from 'src/app/common/constants';
import { Answer, AnswerID, Question, QuestionID } from 'src/app/common/interfaces';
import { urlJoin } from 'url-join-ts';

@Injectable({
  providedIn: 'root'
})
export class AnswerApiService {

  constructor(
    private http: HttpClient,
  ) { }

  getAnswer(id: AnswerID): Observable<Answer> {
    const url = urlJoin(HOST, 'answers', `${id}`);
    return this.http.get<Answer>(url);
  }

  approveAnswer(id: AnswerID): Observable<Answer> {
    const url = urlJoin(HOST, 'votes');
    const params = { action: 'approve', answer: `${id}` };
    return this.http.put<Answer>(url, {}, { params });
  }

  cancelApproveAnswer(id: AnswerID): Observable<Answer> {
    const url = urlJoin(HOST, 'votes');
    const params = { action: 'approve', answer: `${id}` };
    return this.http.delete<Answer>(url, { params });
  }

  opposeAnswer(id: AnswerID): Observable<Answer> {
    const url = urlJoin(HOST, 'votes');
    const params = { action: 'oppose', answer: `${id}` };
    return this.http.put<Answer>(url, {}, { params });
  }

  cancelOpposeAnswer(id: AnswerID): Observable<Answer> {
    const url = urlJoin(HOST, 'votes');
    const params = { action: 'oppose', answer: `${id}` };
    return this.http.delete<Answer>(url, { params });
  }

}
