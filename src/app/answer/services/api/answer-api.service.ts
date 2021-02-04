import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HOST } from 'src/app/common/constants';
import { Answer, AnswerID } from 'src/app/common/interfaces';
import { urlJoin } from 'url-join-ts';

@Injectable({
  providedIn: 'root'
})
export class AnswerApiService {

  constructor(
    private http: HttpClient,
  ) { }

  getAnswer(id: AnswerID): Observable<Answer> {
    const url = urlJoin(HOST, 'answers', `${id}`)
    return this.http.get<Answer>(url);
  }

}
