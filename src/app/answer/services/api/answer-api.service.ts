import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HOST as host } from 'src/app/common/constants';
import { Answer, AnswerID, ResourceType } from 'src/app/common/interfaces';
import { join } from 'src/app/common/utils';

@Injectable({
  providedIn: 'root'
})
export class AnswerApiService {

  constructor(
    private http: HttpClient,
  ) { }

  getAnswer(id: AnswerID): Observable<Answer> {
    const url = join({ host, segments: [ResourceType.ANSWERS, id] });
    return this.http.get<Answer>(url);
  }

  approveAnswer(id: AnswerID): Observable<Answer> {
    const params = { action: 'approve', answer: id };
    const url = join({ host, segments: [ResourceType.VOTES], params });
    return this.http.put<Answer>(url, {});
  }

  cancelApproveAnswer(id: AnswerID): Observable<Answer> {
    const params = { action: 'approve', answer: id };
    const url = join({ host, segments: [ResourceType.VOTES], params });
    return this.http.delete<Answer>(url);
  }

  opposeAnswer(id: AnswerID): Observable<Answer> {
    const params = { action: 'oppose', answer: id };
    const url = join({ host, segments: [ResourceType.VOTES], params });
    return this.http.put<Answer>(url, {});
  }

  cancelOpposeAnswer(id: AnswerID): Observable<Answer> {
    const params = { action: 'oppose', answer: id };
    const url = join({ host, segments: [ResourceType.VOTES], params });
    return this.http.delete<Answer>(url);
  }

}
