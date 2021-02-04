import { User } from './user';

export enum AnswerStatus {
  APPROVE = 'approve',
  OPPOSE = 'oppose',
  NONE = 'none',
}

export interface Answer {

  id: number;
  question: number;
  covers?: string[];
  user: User;
  content: string;
  count: {
    approve: number;
    oppose: number;
    comment: number;
  }
  date: Date;
  status: AnswerStatus;

}

export type AnswerID = Answer['id'];
