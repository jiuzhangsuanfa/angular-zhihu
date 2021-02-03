import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HOST } from 'src/app/common/constants';
import { Answer, Question, QuestionID } from 'src/app/common/interfaces';
import urljoin from 'url-join';

@Injectable({
  providedIn: 'root'
})
export class QuestionApiService {

  constructor(
    private http: HttpClient,
  ) { }

  getQuestions(start: QuestionID = 0): Observable<Question[]> {
    const url = urljoin(HOST, 'questions')
    console.log(url);
    return this.http.get<Question[]>(url);
  }

  getQuestion(id: QuestionID): Observable<Question> {
    const url = urljoin(HOST, 'questions', `${id}`);
    return this.http.get<Question>(url);
  }

  approveQuestion(id: QuestionID): Observable<Question> {
    const url = urljoin(HOST, 'votes');
    const params = { action: 'approve', question: `${id}` };
    return this.http.put<Question>(url, {}, { params });
  }

  cancelApproveQuestion(id: QuestionID): Observable<Question> {
    const url = urljoin(HOST, 'votes');
    const params = { action: 'approve', question: `${id}` };
    return this.http.delete<Question>(url, { params });
  }

  opposeQuestion(id: QuestionID): Observable<Question> {
    const url = urljoin(HOST, 'votes');
    const params = { action: 'oppose', question: `${id}` };
    return this.http.put<Question>(url, {}, { params });
  }

  cancelOpposeQuestion(id: QuestionID): Observable<Question> {
    const url = urljoin(HOST, 'votes');
    const params = { action: 'oppose', question: `${id}` };
    return this.http.delete<Question>(url, { params });
  }

  getAnswersOfQuestion(question: QuestionID, next: QuestionID = 0): Observable<Answer[]> {
    const url = urljoin(HOST, 'answers');
    const params = { question: `${question}`, next: `${next}` };
    return this.http.get<Answer[]>(url, { params });
  }

}
