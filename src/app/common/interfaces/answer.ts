import { User } from './user';

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

}

export type AnswerID = Answer['id'];
