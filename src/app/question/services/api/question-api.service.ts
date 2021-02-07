import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HOST as host } from 'src/app/common/constants';
import { Answer, Question, QuestionID } from 'src/app/common/interfaces';
import { join } from 'src/app/common/utils';

@Injectable({
  providedIn: 'root'
})
export class QuestionApiService {

  constructor(
    private http: HttpClient,
  ) { }

  getQuestions(start: QuestionID = 0): Observable<Question[]> {
    const url = join({ host, segments: ['questions'] });
    return this.http.get<Question[]>(url);
  }

  getQuestion(id: QuestionID): Observable<Question> {
    const url = join({ host, segments: ['questions', id] });
    return this.http.get<Question>(url);
  }

  approveQuestion(id: QuestionID): Observable<Question> {
    const params = { action: 'approve', question: id };
    const url = join({ host, segments: ['votes'], params });
    return this.http.put<Question>(url, {});
  }

  cancelApproveQuestion(id: QuestionID): Observable<Question> {
    const params = { action: 'approve', question: id };
    const url = join({ host, segments: ['votes'], params });
    return this.http.delete<Question>(url);
  }

  opposeQuestion(id: QuestionID): Observable<Question> {
    const params = { action: 'oppose', question: id };
    const url = join({ host, segments: ['votes'], params });
    return this.http.put<Question>(url, {});
  }

  cancelOpposeQuestion(id: QuestionID): Observable<Question> {
    const params = { action: 'oppose', question: id };
    const url = join({ host, segments: ['votes'], params });
    return this.http.delete<Question>(url);
  }

  getAnswersOfQuestion(question: QuestionID, next: QuestionID = 0): Observable<Answer[]> {
    const params = { question, next };
    const url = join({ host, segments: ['answers'], params });
    return this.http.get<Answer[]>(url);
  }

}
