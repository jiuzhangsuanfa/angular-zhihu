import { Injectable } from '@angular/core';
import { Answer, AnswerID, Question, QuestionID } from '../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  private questions: { [index: number]: Question } = {};
  private answers: { [index: number]: Answer } = {};

  constructor() { }

  hasQuestion(id: QuestionID): boolean {
    return !!this.questions[id];
  }

  hasAnswer(id: AnswerID): boolean {
    return !!this.answers[id];
  }

  getQuestion(id: QuestionID): Question | undefined {
    return this.questions[id];
  }

  getAnswer(id: AnswerID): Answer | undefined {
    return this.answers[id];
  }

  setQuestion(question: Question): CacheService {
    this.questions[question.id] = question;
    return this;
  }

  setAnswer(answer: Answer): CacheService {
    this.answers[answer.id] = answer;
    return this;
  }

}
